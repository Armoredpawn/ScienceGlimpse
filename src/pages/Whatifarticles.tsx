import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import articlesData from '@/data/Creaturearticles.json';

const Articles = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample articles data - in a real app this would come from an API
  const allArticles = articlesData;


  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = !category || article.category === category;
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryNames = {
    Physics: 'Physics',
    Biology: 'Biology', 
    Chemistry: 'Chemistry',
    Astronomy: 'Astronomy',
    Medicine: 'Medicine',
    Technology: 'Technology',
    Engineering: 'Engineering',
    'Earth-science': 'Earth Science'
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />
      
      <main className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-quantum via-molecule to-neuron bg-clip-text text-transparent mb-4">
              {category ? `${categoryNames[category as keyof typeof categoryNames]} Articles` : 'What If? Articles'}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              Imaginative science stories that explore wild questions and fascinating scenarios—like “What if the Moon disappeared?” or “What if humans could breathe underwater?” Backed by real science, these articles dive into what could happen, even if it’s not likely.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-card/60 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag className="w-3 h-3" />
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded-full font-medium capitalize">
                      {article.category}
                    </span>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    
                    <Button size="sm" variant="outline" onClick={() => window.location.href = `#/creaturearticle?id=${article.id}`}>
                      Read More →
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No articles found</p>
              <p className="text-muted-foreground">Try adjusting your search or browse different categories</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Articles;