import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-4RRLCNEK8N", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
