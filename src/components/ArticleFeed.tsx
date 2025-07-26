import React from 'react';
import articles from '../data/articles.json';
import { Button } from './ui/button';
import { Clock, User, ArrowRight, Heart, Bookmark } from 'lucide-react';

interface Article {
  id: string | number;
  title: string;
  emoji: string;
  category: string;
  readTime: string;
  author: string;
  excerpt: string;
  gradient: string;
}

const ArticleFeed = () => {
  return (
    <section className="py-20 px-4" id="discover">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-quantum to-molecule bg-clip-text text-transparent mb-6">
            Discover Your Next Scientific Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each article is crafted to take 5 minutes — Perfect for curious minds on the go.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[2, 5, 6] // ← Your chosen article IDs
          .map(id => articles.find(article => article.id === id))
          .filter(Boolean) // Removes undefined in case ID not found
          .map((article) => (
            <div key={article.id} className="group">
              <div className="card-glow h-full p-6 rounded-xl relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-3xl group-hover:animate-bounce hover:scale-110 transition-transform duration-300">
                      {article.emoji}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold transition-colors duration-300 text-slate-50">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="hover:text-primary">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:text-primary">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:text-primary"
                      onClick={() => (window.location.href = `#/article?id=${article.id}`)}
                    >
                      Read Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <Button
            variant="quantum"
            size="lg"
            className="px-8"
            onClick={() => (window.location.href = '/articles')}
          >
            Explore More Science
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticleFeed;
