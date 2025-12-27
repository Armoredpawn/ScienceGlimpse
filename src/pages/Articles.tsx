import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import articlesData from '@/data/articles.json';

const Articles = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const theme = searchParams.get('theme');

  const [searchTerm, setSearchTerm] = useState('');

  const allArticles = articlesData;

  // =========================
  // FILTERING LOGIC
  // =========================
  const filteredArticles = allArticles.filter(article => {
    const articleCategories = Array.isArray(article.category)
      ? article.category
      : [article.category];

    const normalizedCategories = articleCategories.map(c =>
      c.toLowerCase().replace(/\s+/g, '-').trim()
    );

    // Subject/category filter (homepage)
    const matchesCategory =
      !category ||
      normalizedCategories.includes(category.toLowerCase().trim());

    // Theme filter (themes page)
    const matchesTheme =
      !theme ||
      normalizedCategories.includes(theme.toLowerCase().trim());

    // Search filter
    const matchesSearch =
      !searchTerm ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesTheme && matchesSearch;
  });

  // =========================
  // INFINITE SCROLL
  // =========================
  const initialArticlesToLoad = 16;
  const articlesToLoadPerScroll = 9;
  const [articlesToShow, setArticlesToShow] = useState(initialArticlesToLoad);
  const [loadingMore, setLoadingMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMoreArticles = useCallback(() => {
    if (loadingMore || articlesToShow >= filteredArticles.length) return;

    setLoadingMore(true);
    setTimeout(() => {
      setArticlesToShow(prev =>
        Math.min(prev + articlesToLoadPerScroll, filteredArticles.length)
      );
      setLoadingMore(false);
    }, 500);
  }, [loadingMore, articlesToShow, filteredArticles.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          !loadingMore &&
          articlesToShow < filteredArticles.length
        ) {
          loadMoreArticles();
        }
      },
      { rootMargin: '100px' }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [loadingMore, articlesToShow, filteredArticles.length, loadMoreArticles]);

  // =========================
  // CATEGORY DISPLAY NAMES
  // =========================
  const categoryNames: Record<string, string> = {
    physics: 'Physics',
    biology: 'Biology',
    chemistry: 'Chemistry',
    astronomy: 'Astronomy',
    medicine: 'Medicine',
    technology: 'Technology',
    engineering: 'Engineering',
    'earth-science': 'Earth Science',
    psychology: 'Psychology',
    math: 'Math',
    'artificial-intelligence': 'Artificial Intelligence',
    'data-science': 'Data Science',
    junior: 'Junior',
    creature: 'Creature Profile',
    debunked: 'Debunked',
    whatif: 'What If?',
    how: 'How???',
  };

  const activeLabel =
    theme
      ? categoryNames[theme] || theme
      : category
      ? categoryNames[category] || category
      : 'All Articles';

  // =========================
  // RENDER
  // =========================
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-quantum via-molecule to-neuron bg-clip-text text-transparent mb-4">
              {activeLabel} Articles
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              Discover the latest insights and breakthroughs in science
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(0, articlesToShow).map(article => (
              <article
                key={article.id}
                onClick={() => (window.location.href = `#/article?id=${article.id}`)}
                className="group bg-card/60 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => {
                      e.currentTarget.src =
                        'https://placehold.co/400x225/2d3748/ffffff?text=No+Image';
                    }}
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag className="w-3 h-3" />
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded-full font-medium capitalize">
                      {Array.isArray(article.category)
                        ? article.category.join(', ')
                        : article.category}
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

                    <Button size="sm" variant="outline">
                      Read More →
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Infinite Scroll */}
          {filteredArticles.length > 0 && articlesToShow < filteredArticles.length && (
            <div ref={sentinelRef} className="py-8 text-center text-muted-foreground">
              {loadingMore ? 'Loading more articles...' : 'Scroll down to load more articles'}
            </div>
          )}

          {filteredArticles.length > 0 && articlesToShow >= filteredArticles.length && (
            <div className="py-8 text-center text-muted-foreground">
              You've reached the end of the articles.
            </div>
          )}

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No articles found</p>
              <p className="text-muted-foreground">
                Try adjusting your filters or browse different categories
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Articles;
