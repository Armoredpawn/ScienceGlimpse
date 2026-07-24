import { useEffect, useRef, useState } from "react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

const HEARTBEAT_SECONDS = 15;
const REWARD_SECONDS = 240;
const IDLE_LIMIT_MS = 60_000;

interface HeartbeatResult {
  activeSeconds: number;
  rewarded: boolean;
}

async function recordReadingHeartbeat(
  userId: string,
  articleId: string,
): Promise<HeartbeatResult> {
  const progressReference = doc(
    db,
    "users",
    userId,
    "readingProgress",
    articleId,
  );

  const rewardReference = doc(
    db,
    "users",
    userId,
    "tokenLedger",
    articleId,
  );

  return runTransaction(db, async (transaction) => {
    const progressSnapshot =
      await transaction.get(progressReference);

    if (!progressSnapshot.exists()) {
      transaction.set(progressReference, {
        articleId,
        activeSeconds: HEARTBEAT_SECONDS,
        rewarded: false,
        lastHeartbeatAt: serverTimestamp(),
        rewardedAt: null,
      });

      return {
        activeSeconds: HEARTBEAT_SECONDS,
        rewarded: false,
      };
    }

    const progress = progressSnapshot.data();

    const currentSeconds =
      typeof progress.activeSeconds === "number"
        ? progress.activeSeconds
        : 0;

    const alreadyRewarded = progress.rewarded === true;

    if (alreadyRewarded) {
      return {
        activeSeconds: REWARD_SECONDS,
        rewarded: true,
      };
    }

    const nextSeconds = Math.min(
      currentSeconds + HEARTBEAT_SECONDS,
      REWARD_SECONDS,
    );

    const shouldReward = nextSeconds >= REWARD_SECONDS;

    transaction.update(progressReference, {
      activeSeconds: nextSeconds,
      rewarded: shouldReward,
      lastHeartbeatAt: serverTimestamp(),
      rewardedAt: shouldReward ? serverTimestamp() : null,
    });

    if (shouldReward) {
      transaction.set(rewardReference, {
        articleId,
        amount: 10,
        type: "article_read",
        createdAt: serverTimestamp(),
      });
    }

    return {
      activeSeconds: nextSeconds,
      rewarded: shouldReward,
    };
  });
}

export function useArticleReadingReward(
  articleId: string | null,
) {
  const { user, loading: authLoading } = useAuth();

  const articleRef = useRef<HTMLElement | null>(null);
  const articleInViewRef = useRef(false);
  const lastActivityRef = useRef(Date.now());
  const pendingSecondsRef = useRef(0);
  const confirmedSecondsRef = useRef(0);
  const sendingRef = useRef(false);

  const [activeSeconds, setActiveSeconds] = useState(0);
  const [rewarded, setRewarded] = useState(false);
  const [isActivelyReading, setIsActivelyReading] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const userId = user?.uid ?? null;

  // Load previously confirmed reading progress.
  useEffect(() => {
    pendingSecondsRef.current = 0;
    confirmedSecondsRef.current = 0;
    sendingRef.current = false;
    lastActivityRef.current = Date.now();

    setActiveSeconds(0);
    setRewarded(false);
    setIsActivelyReading(false);
    setErrorMessage("");

    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!userId || !articleId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadProgress = async () => {
      setLoading(true);

      try {
        const progressReference = doc(
          db,
          "users",
          userId,
          "readingProgress",
          articleId,
        );

        const progressSnapshot =
          await getDoc(progressReference);

        if (cancelled || !progressSnapshot.exists()) {
          return;
        }

        const progress = progressSnapshot.data();

        const storedSeconds =
          typeof progress.activeSeconds === "number"
            ? Math.min(
                progress.activeSeconds,
                REWARD_SECONDS,
              )
            : 0;

        const storedRewarded = progress.rewarded === true;

        confirmedSecondsRef.current = storedSeconds;

        setActiveSeconds(storedSeconds);
        setRewarded(storedRewarded);
      } catch (error) {
        console.error(
          "Could not load reading progress:",
          error,
        );

        if (!cancelled) {
          setErrorMessage(
            "Reading progress could not be loaded.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadProgress();

    return () => {
      cancelled = true;
    };
  }, [articleId, authLoading, userId]);

  // Check whether any portion of the article is visible.
  useEffect(() => {
    const articleElement = articleRef.current;

    if (!articleElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        articleInViewRef.current = entry.isIntersecting;
      },
      {
        threshold: 0,
      },
    );

    observer.observe(articleElement);

    return () => {
      observer.disconnect();
      articleInViewRef.current = false;
    };
  }, [articleId]);

  // Track real interaction and pause when the user leaves.
  useEffect(() => {
    const markActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const pauseUntilNextInteraction = () => {
      lastActivityRef.current = 0;
      setIsActivelyReading(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        pauseUntilNextInteraction();
      }
    };

    window.addEventListener("scroll", markActivity, {
      passive: true,
    });

    window.addEventListener("pointerdown", markActivity);
    window.addEventListener("keydown", markActivity);

    window.addEventListener("touchstart", markActivity, {
      passive: true,
    });

    window.addEventListener(
      "blur",
      pauseUntilNextInteraction,
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      window.removeEventListener("scroll", markActivity);
      window.removeEventListener(
        "pointerdown",
        markActivity,
      );
      window.removeEventListener("keydown", markActivity);
      window.removeEventListener(
        "touchstart",
        markActivity,
      );
      window.removeEventListener(
        "blur",
        pauseUntilNextInteraction,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [articleId]);

  // Count active reading time and confirm it with Firestore.
  useEffect(() => {
    if (
      authLoading ||
      loading ||
      !userId ||
      !articleId ||
      rewarded
    ) {
      setIsActivelyReading(false);
      return;
    }

    const intervalId = window.setInterval(() => {
      const isActive =
        document.visibilityState === "visible" &&
        document.hasFocus() &&
        articleInViewRef.current &&
        Date.now() - lastActivityRef.current <
          IDLE_LIMIT_MS;

      setIsActivelyReading(isActive);

      if (!isActive || sendingRef.current) {
        return;
      }

      pendingSecondsRef.current += 1;

      setActiveSeconds(
        Math.min(
          confirmedSecondsRef.current +
            pendingSecondsRef.current,
          REWARD_SECONDS,
        ),
      );

      if (
        pendingSecondsRef.current <
        HEARTBEAT_SECONDS
      ) {
        return;
      }

      sendingRef.current = true;

      void recordReadingHeartbeat(userId, articleId)
        .then((result) => {
          confirmedSecondsRef.current =
            result.activeSeconds;

          pendingSecondsRef.current = 0;

          setActiveSeconds(result.activeSeconds);
          setRewarded(result.rewarded);
          setErrorMessage("");
        })
        .catch((error) => {
          console.error(
            "Could not record reading progress:",
            error,
          );

          setErrorMessage(
            "Reading progress could not be saved yet. Retrying automatically.",
          );
        })
        .finally(() => {
          sendingRef.current = false;
        });
    }, 1_000);

    return () => {
      window.clearInterval(intervalId);
      setIsActivelyReading(false);
    };
  }, [
    articleId,
    authLoading,
    loading,
    rewarded,
    userId,
  ]);

  return {
    articleRef,
    activeSeconds,
    rewarded,
    isActivelyReading,
    loading: authLoading || loading,
    errorMessage,
    signedIn: Boolean(user),
  };
}