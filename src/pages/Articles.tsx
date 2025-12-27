import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, Clock, User, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import articlesData from '@/data/articles.json';

type Article = {
  id: number | string;
  title: string;
  excerpt: string;
  category: string | string[];
  author?: string;
  readTime?: string;
  thumbnail?: string;
  [key: string]: any;
};

const subjectGlowMap: Record<string, string> = {
  Physics: 'rgba(138, 46, 225, 0.32)',            // purple
  Biology: 'rgba(20, 43, 28, 0.32)',             // green
  Chemistry: 'rgba(169, 249, 22, 0.32)',          // orange
  Astronomy: 'rgba(59,130,246,0.32)',          // blue
  Medicine: 'rgba(21, 200, 232, 0.32)',           // pink
  Technology: 'rgba(233, 208, 14, 0.32)',         // cyan
  Engineering: 'rgba(161, 206, 239, 0.32)',        // amber
  'Earth-science': 'rgba(212, 112, 18, 0.32)',    // teal
  Psychology: 'rgba(255, 19, 220, 0.32)',         // purple-ish
  Math: 'rgba(234,179,8,0.32)',                // yellow
  'Artificial Intelligence': 'rgba(77, 32, 213, 0.32)', // dark greyish-brown
  'Data Science': 'rgba(45,212,191,0.32)',     // turquoise
};

const Articles: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') ?? '';

  const [searchTerm, setSearchTerm] = useState('');
  const allArticles: Article[] = (articlesData as Article[]) ?? [];

  // Filter articles: support category as array or string
  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory =
      !category ||
      (Array.isArray(article.category)
        ? article.category.includes(category)
        : article.category === category);

    const matchesSearch =
      !searchTerm ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Infinite Scrolling Logic
  const initialArticlesToLoad = 16;
  const articlesToLoadPerScroll = 9;
  const [articlesToShow, setArticlesToShow] = useState(initialArticlesToLoad);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMoreArticles = useCallback(() => {
    if (loadingMore || articlesToShow >= filteredArticles.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      setArticlesToShow((prev) => Math.min(prev + articlesToLoadPerScroll, filteredArticles.length));
      setLoadingMore(false);
    }, 500);
  }, [loadingMore, articlesToShow, filteredArticles.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && articlesToShow < filteredArticles.length) {
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

  // Random article navigation
  const goToArticle = (id: string | number) => {
    window.location.href = `#/article?id=${encodeURIComponent(String(id))}`;
  };

  const goToRandomArticle = () => {
    const pool = filteredArticles.length > 0 ? filteredArticles : allArticles;
    if (pool.length === 0) return;
    const idx = Math.floor(Math.random() * pool.length);
    const article = pool[idx];
    goToArticle(article.id);
  };

  // helper category display names
  const categoryNames: Record<string, string> = {
    Physics: 'Physics',
    Biology: 'Biology',
    Chemistry: 'Chemistry',
    Astronomy: 'Astronomy',
    Medicine: 'Medicine',
    Technology: 'Technology',
    Engineering: 'Engineering',
    'Earth-science': 'Earth Science',
    Psychology: 'Psychology',
    Math: 'Math',
  };

  // compute counts for banner
  const currentCount = filteredArticles.length;

  // Manually set the pending article count here for easy editing:
  const PENDING_COUNT = 25; // <-- change this number as you like
  const pendingCount = PENDING_COUNT;

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-20">
        {/* Header Row */}
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <button
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-quantum via-molecule to-neuron bg-clip-text text-transparent mt-6 mb-4">
                {category ? `${categoryNames[category] || category} Articles` : 'All Articles'}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                Discover the latest insights and breakthroughs in science
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={goToRandomArticle}
                disabled={filteredArticles.length === 0 && allArticles.length === 0}
                className="random-native-btn inline-flex items-center gap-2 px-6 py-3 rounded-md text-base font-semibold"
                title={filteredArticles.length > 0 ? 'Open a random article from this list' : 'Open a random article'}
                aria-label="Random article"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h7a4 4 0 0 1 0 8H3"></path><path d="M21 12h-7a4 4 0 0 0 0 8h7"></path></svg>
                Random Article
              </button>
            </div>
          </div>
        </div>

        {/* Banner: gradient background and centered bubbles */}
        <div className="counts-banner-wrap w-full mb-12">
          <div className="counts-banner w-full">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="flex items-center gap-10 flex-wrap">
                <div
                  className="inline-flex items-center rounded-full px-5 py-3 font-semibold text-base"
                  style={{
                    backgroundColor: 'hsl(268 67% 50% / 0.10)',
                    color: 'hsl(268 67% 50%)',
                  }}
                >
                  <span className="mr-4">Number of Current Articles:</span>
                  <span className="text-xl">{currentCount}</span>
                </div>

                <div
                  className="inline-flex items-center rounded-full px-5 py-3 font-semibold text-base"
                  style={{
                    backgroundColor: 'hsl(150 60% 40% / 0.10)',
                    color: 'hsl(150 60% 40%)',
                  }}
                >
                  <span className="mr-4">Number of Pending Articles:</span>
                  <span className="text-xl">{pendingCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search under banner */}
        <div className="max-w-7xl mx-auto px-4 mb-14">
          <div className="relative mx-auto w-full md:w-[860px]">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for your next read..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 py-4 w-full text-lg"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.slice(0, articlesToShow).map((article) => {
              // determine primary subject and glow
              const primarySubject = Array.isArray(article.category) ? article.category[0] : article.category;
              const glow = subjectGlowMap[primarySubject] ?? 'rgba(59,130,246,0.28)';

              return (
                <article
                  key={article.id}
                  onClick={() => goToArticle(article.id)}
                  className="group article-glow-card bg-card/60 backdrop-blur-sm border border-border rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  // set CSS variable for this card's glow color (used by CSS box-shadow)
                  style={{ ['--article-glow' as any]: glow }}
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://placehold.co/400x225/2d3748/ffffff?text=No+Image`;
                      }}
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Tag className="w-3 h-3" />
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded-full font-medium capitalize">
                        {Array.isArray(article.category) ? article.category.join(', ') : article.category}
                      </span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">{article.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); goToArticle(article.id); }}
                        className="read-more-btn px-3 py-1 rounded-md border border-border text-sm font-medium"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Infinite Scroll Sentinel and Status Messages */}
          {filteredArticles.length > 0 && articlesToShow < filteredArticles.length && (
            <div ref={sentinelRef} className="py-8 text-center text-muted-foreground">
              {loadingMore ? 'Loading more articles...' : 'Scroll down to load more articles'}
            </div>
          )}

          {filteredArticles.length > 0 && articlesToShow >= filteredArticles.length && (
            <div className="py-8 text-center text-muted-foreground">You've reached the end of the articles.</div>
          )}

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