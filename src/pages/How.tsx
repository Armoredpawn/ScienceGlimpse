import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
// import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import articles from '@/data/Juniorarticles.json';

const Article = () => {
  // Add this useEffect hook
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
      {/* <AnimatedBackground /> */}
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

        <div className="text-lg leading-relaxed text-foreground whitespace-pre-line">
          {article.content}
        </div>
      </main>
    </div>
  );
};

export default Article;