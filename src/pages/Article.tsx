import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import articles from '../data/articles.json';
import highlightContentWithGlossary from '@/lib/glossary';

const SITE_NAME = 'ScienceGlimpse';
const SITE_URL = 'https://scienceglimpse.org';

const updateMetaTag = (
  attribute: 'name' | 'property',
  value: string,
  content: string
) => {
  let metaTag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${value}"]`
  );

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, value);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute('content', content);
};

const updateCanonicalUrl = (url: string) => {
  let canonicalLink = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );

  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }

  canonicalLink.setAttribute('href', url);
};

const Article = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get('id'));

  const article = articles.find(
    (currentArticle) => Number(currentArticle.id) === id
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    const structuredDataId = 'article-structured-data';
    const existingStructuredData =
      document.getElementById(structuredDataId);

    if (existingStructuredData) {
      existingStructuredData.remove();
    }

    if (!article) {
      document.title = `Article Not Found | ${SITE_NAME}`;

      updateMetaTag(
        'name',
        'description',
        'The requested ScienceGlimpse article could not be found.'
      );

      updateMetaTag('name', 'robots', 'noindex, nofollow');

      return;
    }

    const articleUrl =
      `${SITE_URL}/article?id=${encodeURIComponent(
        String(article.id)
      )}`;

    const descriptionSource =
      article.excerpt || article.content || article.title;

    const cleanDescription = descriptionSource
      .replace(/\s+/g, ' ')
      .trim();

    const description =
      cleanDescription.length > 160
        ? `${cleanDescription.slice(0, 157)}...`
        : cleanDescription;

    const imageUrl = article.thumbnail
      ? new URL(article.thumbnail, SITE_URL).href
      : `${SITE_URL}/favicon.ico`;

    document.title = `${article.title} | ${SITE_NAME}`;

    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'robots', 'index, follow');

    updateMetaTag('property', 'og:type', 'article');
    updateMetaTag('property', 'og:site_name', SITE_NAME);
    updateMetaTag('property', 'og:title', article.title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', articleUrl);
    updateMetaTag('property', 'og:image', imageUrl);

    updateMetaTag(
      'name',
      'twitter:card',
      'summary_large_image'
    );
    updateMetaTag('name', 'twitter:title', article.title);
    updateMetaTag(
      'name',
      'twitter:description',
      description
    );
    updateMetaTag('name', 'twitter:image', imageUrl);

    updateCanonicalUrl(articleUrl);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description,
      image: imageUrl,
      url: articleUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      author: {
        '@type': 'Person',
        name: article.author || 'ScienceGlimpse Contributor',
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      ...(article.date
        ? {
            datePublished: article.date,
            dateModified: article.date,
          }
        : {}),
    };

    const structuredDataScript =
      document.createElement('script');

    structuredDataScript.id = structuredDataId;
    structuredDataScript.type = 'application/ld+json';
    structuredDataScript.textContent =
      JSON.stringify(structuredData);

    document.head.appendChild(structuredDataScript);

    return () => {
      document
        .getElementById(structuredDataId)
        ?.remove();
    };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-muted-foreground">
          Article not found.
        </p>

        <Button
          onClick={() => window.history.back()}
          className="mt-4"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <Navigation />

      <main className="relative z-10 pt-20 max-w-3xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <article>
          <header>
            <h1 className="text-4xl font-bold mb-4">
              {article.title}
            </h1>

            <p className="text-muted-foreground mb-4">
              By {article.author} • {article.date}
            </p>

            <div className="aspect-video mb-6 rounded-lg overflow-hidden">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          <div className="text-lg leading-relaxed text-foreground">
            <div className="whitespace-pre-line">
              {highlightContentWithGlossary(article.content)}
            </div>
          </div>

          {article.references &&
            article.references.length > 0 && (
              <div className="mt-12 border-t pt-8">
                <h2 className="text-2xl font-bold mb-4">
                  References
                </h2>

                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  {article.references.map((reference, index) => (
                    <li key={index}>
                      {reference.author && (
                        <span>{reference.author}, </span>
                      )}

                      {reference.url ? (
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-foreground transition-colors"
                        >
                          {reference.title}
                        </a>
                      ) : (
                        <span>{reference.title}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
        </article>
      </main>
    </div>
  );
};

export default Article;