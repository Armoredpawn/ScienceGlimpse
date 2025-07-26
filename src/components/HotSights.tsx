import React, { useState } from 'react';
import { Button } from './ui/button';
import { Heart, X, Clock, User } from 'lucide-react';
import articles from '../data/articles.json';  // Import articles JSON


const HotSights = () => {
  const [preference, setPreference] = useState<'like' | 'dislike' | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const handlePreference = (type: 'like' | 'dislike', articleId: number) => {
    setPreference(type);
    setSelectedArticle(articleId);
    setTimeout(() => {
      setPreference(null);
      setSelectedArticle(null);
    }, 2000);
  };

  // Select which article IDs to show here:
  const hotArticleIds = [1, 2, 3, 4];
  const hotArticles = articles.filter(article => hotArticleIds.includes(article.id));

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-indigo-800/50 via-purple-800/50 to-indigo-900/50 ring-1 ring-orange-400/50 shadow-[0_0_20px_rgba(255,99,71,0.3)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4 flex items-center justify-center gap-2">
            <span className="text-4xl md:text-5xl animate-pulse">🔥</span>
            Hot Sights
          </h2>
          <p className="text-lg text-pink-200 max-w-2xl mx-auto">
            Today's most fascinating discoveries, handpicked for curious minds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {hotArticles.map((article) => (
            <div
              key={article.id}
              className="group bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 relative"
            >
              <div className="text-4xl mb-4 transition-all duration-300 group-hover:animate-bounce">
                {/* Show emoji or fallback */}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                    {article.category || 'Science'}
                  </span>
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime || '5 min'}</span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {/* HERE: Use the excerpt from your JSON */}
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handlePreference('like', article.id)}
                      className="w-4 h-4 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200"
                    >
                      <Heart className="w-4 h-4 text-pink-500" />
                    </button>
                    <button 
                      onClick={() => handlePreference('dislike', article.id)}
                      className="w-4 h-4 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button> 
                  </div>
                  <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:text-primary"
                      onClick={() => (window.location.href = `/article?id=${article.id}`)}
                  >
                      Read Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HotSights;
