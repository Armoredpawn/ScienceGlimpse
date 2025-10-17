// ArticlePage.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./data/articles.json";

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find(a => a.id === Number(id));

  useEffect(() => {
    if (typeof window.gtag === "function" && article) {
      const pagePath = window.location.hash.replace(/^#/, "") || "/article";
      const pageLocation = window.location.href;
      const pageTitle = article.title;

      // ✅ Standard GA page_view (shows up in "Pages and screens")
      window.gtag("event", "page_view", {
        page_path: pagePath,
        page_title: pageTitle,
        page_location: pageLocation,
      });

      // ✅ Custom event (shows up in "Events" for detailed article data)
      window.gtag("event", "article_view", {
        article_id: article.id,
        article_title: article.title,
        article_category: article.category?.join(", ") || "Unknown",
        page_path: pagePath,
        page_location: pageLocation,
      });

      console.log("Logged GA page_view + article_view:", pagePath);
    }
  }, [article]);

  if (!article) return <p>Article not found.</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}
