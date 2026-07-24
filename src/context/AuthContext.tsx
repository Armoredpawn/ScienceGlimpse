import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import {
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../lib/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

class UsernameTakenError extends Error {}

function createDefaultUsername(user: User): string {
  const source =
    user.displayName ||
    user.email?.split("@")[0] ||
    "scienceuser";

  const normalizedUsername = source
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 20);

  if (normalizedUsername.length >= 3) {
    return normalizedUsername;
  }

  return `user_${user.uid.slice(0, 8).toLowerCase()}`;
}

async function ensureUserProfile(user: User): Promise<void> {
  const profileReference = doc(db, "users", user.uid);
  const baseUsername = createDefaultUsername(user);

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const suffix =
      attempt === 0 ? "" : `_${attempt + 1}`;

    const availableLength = 20 - suffix.length;

    const username =
      `${baseUsername.slice(0, availableLength)}${suffix}`;

    const usernameReference = doc(
      db,
      "usernames",
      username,
    );

    try {
      await runTransaction(db, async (transaction) => {
        const profileSnapshot =
          await transaction.get(profileReference);

        // Do not replace an existing username.
        if (profileSnapshot.exists()) {
          return;
        }

        const usernameSnapshot =
          await transaction.get(usernameReference);

        if (
          usernameSnapshot.exists() &&
          usernameSnapshot.data().uid !== user.uid
        ) {
          throw new UsernameTakenError();
        }

        transaction.set(usernameReference, {
          uid: user.uid,
        });

        transaction.set(profileReference, {
          username,
          photoURL: user.photoURL ?? "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });

      return;
    } catch (error) {
      if (error instanceof UsernameTakenError) {
        continue;
      }

      throw error;
    }
  }

  throw new Error(
    "Could not generate an available default username.",
  );
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        void (async () => {
          try {
            if (currentUser) {
              await ensureUserProfile(currentUser);
            }
          } catch (error) {
            console.error(
              "Could not create default user profile:",
              error,
            );
          } finally {
            if (active) {
              setUser(currentUser);
              setLoading(false);
            }
          }
        })();
      },
      (error) => {
        console.error("Authentication error:", error);

        if (active) {
          setLoading(false);
        }
      },
    );

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used inside an AuthProvider.",
    );
  }

  return context;
}