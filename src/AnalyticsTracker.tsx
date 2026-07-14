// AnalyticsTracker.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      // Get the current browser route and query string
      const pagePath = `${location.pathname}${location.search}`;

      // Send standard GA4 page_view event
      window.gtag("event", "page_view", {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });

      // Optional: send a custom article_view event if the route is /article?id=...
      const match = pagePath.match(/^\/article\?id=(\d+)$/);

      if (match) {
        const articleId = match[1];
        const articleElement = document.querySelector("h1");
        const articleTitle = articleElement
          ? articleElement.textContent
          : `Article ${articleId}`;

        window.gtag("event", "article_view", {
          article_id: articleId,
          article_title: articleTitle,
          page_path: pagePath,
          page_location: window.location.href,
        });
      }
    }
  }, [location]);

  return null;
}