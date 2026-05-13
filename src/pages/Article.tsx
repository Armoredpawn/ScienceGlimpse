import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import articles from '../data/articles.json';
import highlightContentWithGlossary from '@/lib/glossary'

const Article = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get('id'));
  const article = articles.find(a => Number(a.id) === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-muted-foreground">Article not found.</p>
        <Button onClick={() => window.history.back()} className="mt-4">Go Back</Button>
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

        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-muted-foreground mb-4">By {article.author} • {article.date}</p>

        <div className="aspect-video mb-6 rounded-lg overflow-hidden">
          <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <div className="text-lg leading-relaxed text-foreground">
          <div className="whitespace-pre-line">
            {highlightContentWithGlossary(article.content)}
          </div>
        </div>

        {/* // "references": [{ "author": "Kip Thorne", "title": "The Science of Interstellar", "url": "https://example.com" }, { "author": "NASA", "title": "Gravity Assist", "url": "https://example.com" }], */}
        {article.references && article.references.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">References</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              {article.references.map((ref, i) => (
                <li key={i}>
                  {ref.author && <span>{ref.author}, </span>}
                  {ref.url ? (
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
                      {ref.title}
                    </a>
                  ) : (
                    <span>{ref.title}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </main>
    </div>
  );
};

export default Article;