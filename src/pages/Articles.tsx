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
  Physics: 'rgba(138, 46, 225, 0.32)',
  Biology: 'rgba(20, 43, 28, 0.32)',
  Chemistry: 'rgba(169, 249, 22, 0.32)',
  Astronomy: 'rgba(59,130,246,0.32)',
  Medicine: 'rgba(21, 200, 232, 0.32)',
  Technology: 'rgba(233, 208, 14, 0.32)',
  Engineering: 'rgba(161, 206, 239, 0.32)',
  'Earth-science': 'rgba(212, 112, 18, 0.32)',
  Psychology: 'rgba(255, 19, 220, 0.32)',
  Math: 'rgba(234,179,8,0.32)',
  'Artificial Intelligence': 'rgba(77, 32, 213, 0.32)',
  'Data Science': 'rgba(45,212,191,0.32)',
  Junior: 'rgba(34, 197, 94, 0.32)',
  Debunked: 'rgba(99, 102, 241, 0.32)',
};

const Articles: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category') || '';
  const authorQuery = searchParams.get('author') || '';
  const themeQuery = searchParams.get('theme') || '';
  const activeFilter = categoryQuery || themeQuery;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>(categoryQuery ? [categoryQuery] : []);
  const allArticles: Article[] = (articlesData as Article[]) ?? [];

  const filteredArticles = allArticles.filter((article) => {
    const articleCategories = Array.isArray(article.category) ? article.category : [article.category];
    const matchesCategory = activeCategories.length === 0 || articleCategories.some(cat => activeCategories.some(ac => ac.toLowerCase() === cat.toLowerCase()));
    const matchesSearch = !searchTerm || article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthor = !authorQuery || (article.author && article.author.toLowerCase() === authorQuery.toLowerCase());
    return matchesCategory && matchesSearch && matchesAuthor;
  });

  const [articlesToShow, setArticlesToShow] = useState(16);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMoreArticles = useCallback(() => {
    if (loadingMore || articlesToShow >= filteredArticles.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      setArticlesToShow(prev => Math.min(prev + 9, filteredArticles.length));
      setLoadingMore(false);
    }, 500);
  }, [loadingMore, articlesToShow, filteredArticles.length]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore && articlesToShow < filteredArticles.length) loadMoreArticles();
    }, { rootMargin: '100px' });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadingMore, articlesToShow, filteredArticles.length, loadMoreArticles]);

  const goToArticle = (id: string | number) => {
    window.location.href = `#/article?id=${encodeURIComponent(String(id))}`;
  };

  const goToRandomArticle = () => {
    const pool = filteredArticles.length > 0 ? filteredArticles : allArticles;
    if (pool.length === 0) return;
    const idx = Math.floor(Math.random() * pool.length);
    goToArticle(pool[idx].id);
  };

  const categoryNames: Record<string, string> = {
    'Earth-science': 'Earth Science',
    'Artificial Intelligence': 'Artificial Intelligence',
    'Data Science': 'Data Science'
  };

  const currentCount = filteredArticles.length;
  const PENDING_COUNT = 6;

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-20">
        {/* Header Row - RESTORED */}
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <button className="inline-flex items-center text-sm text-muted-foreground hover:text-primary" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-quantum via-molecule to-neuron bg-clip-text text-transparent mt-6 mb-4">
                {activeFilter ? `${categoryNames[activeFilter] || activeFilter} Articles` : 'All Articles'}
              </h1>
              <p className="text-lg text-muted-foreground">Discover the latest insights and breakthroughs in science</p>
            </div>
            <div className="flex-shrink-0">
              <button onClick={goToRandomArticle} className="random-native-btn inline-flex items-center gap-2 px-6 py-3 rounded-md text-base font-semibold">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h7a4 4 0 0 1 0 8H3"></path><path d="M21 12h-7a4 4 0 0 0 0 8h7"></path></svg>
                Random Article
              </button>
            </div>
          </div>
        </div>

        {/* Banner - RESTORED */}
        <div className="counts-banner-wrap w-full mb-12">
          <div className="counts-banner w-full">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="flex items-center gap-10 flex-wrap">
                <div className="inline-flex items-center rounded-full px-5 py-3 font-semibold text-base" style={{ backgroundColor: 'hsl(268 67% 50% / 0.10)', color: 'hsl(268 67% 50%)' }}>
                  <span className="mr-4">Number of Current Articles:</span>
                  <span className="text-xl">{currentCount}</span>
                </div>
                <div className="inline-flex items-center rounded-full px-5 py-3 font-semibold text-base" style={{ backgroundColor: 'hsl(150 60% 40% / 0.10)', color: 'hsl(150 60% 40%)' }}>
                  <span className="mr-4">Number of Pending Articles:</span>
                  <span className="text-xl">{PENDING_COUNT}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-7xl mx-auto px-4 mb-14">
          <div className="relative mx-auto w-full md:w-[860px]">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input placeholder="Search for your next read..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-14 py-4 w-full text-lg" />
          </div>
        </div>

        {/* Compact category toggles (below search) */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="flex items-center justify-center gap-3 overflow-x-auto whitespace-nowrap px-2">
            {[
              { label: 'Physics', key: 'Physics', color: 'rgb(124,58,237)', lightColor: 'rgba(124,58,237,0.2)' },
              { label: 'Biology', key: 'Biology', color: 'rgb(45,212,191)', lightColor: 'rgba(45,212,191,0.2)' },
              { label: 'Chemistry', key: 'Chemistry', color: 'rgb(190,242,100)', lightColor: 'rgba(190,242,100,0.2)' },
              { label: 'Astronomy', key: 'Astronomy', color: 'rgb(59,130,246)', lightColor: 'rgba(59,130,246,0.2)' },
              { label: 'Medicine', key: 'Medicine', color: 'rgb(96,165,250)', lightColor: 'rgba(96,165,250,0.2)' },
              { label: 'Technology', key: 'Technology', color: 'rgb(250,204,21)', lightColor: 'rgba(250,204,21,0.2)' },
              { label: 'Earth Science', key: 'Earth Science', color: 'rgb(251,146,60)', lightColor: 'rgba(251,146,60,0.2)' },
              { label: 'Engineering', key: 'Engineering', color: 'rgb(156,163,175)', lightColor: 'rgba(156,163,175,0.2)' },
              { label: 'Psychology', key: 'Psychology', color: 'rgb(244,114,182)', lightColor: 'rgba(244,114,182,0.2)' },
              { label: 'Math', key: 'Math', color: 'rgb(239,68,68)', lightColor: 'rgba(239,68,68,0.2)' },
              { label: 'AI', key: 'Artificial Intelligence', color: 'rgb(140,80,200)', lightColor: 'rgba(140,80,200,0.2)' },
              { label: 'Data Science', key: 'Data Science', color: 'rgb(14,165,164)', lightColor: 'rgba(14,165,164,0.2)' }
            ].map(cat => {
              const isActive = activeCategories.some(a => a.toLowerCase() === cat.key.toLowerCase());
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategories(prev => prev.some(a => a.toLowerCase() === cat.key.toLowerCase()) ? prev.filter(a => a.toLowerCase() !== cat.key.toLowerCase()) : [...prev, cat.key]);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 border inline-block`}
                  style={{
                    backgroundColor: isActive ? cat.lightColor : 'transparent',
                    borderColor: isActive ? cat.color : 'rgba(100,100,100,0.3)',
                    color: isActive ? cat.color : 'inherit'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.slice(0, articlesToShow).map((article) => {
              const primarySubject = Array.isArray(article.category) ? article.category[0] : article.category;
              const glow = subjectGlowMap[primarySubject] ?? 'rgba(59,130,246,0.28)';
              return (
                <article key={article.id} onClick={() => goToArticle(article.id)} className="group article-glow-card bg-card/60 backdrop-blur-sm border border-border rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer" style={{ ['--article-glow' as any]: glow }}>
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Tag className="w-3 h-3" />
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                        {Array.isArray(article.category) ? article.category.join(', ') : article.category}
                      </span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{article.readTime}</span>
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">{article.title}</h2>
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"><User className="w-4 h-4" /><span>{article.author}</span></div>
                      <button className="read-more-btn px-3 py-1 rounded-md border border-border text-sm font-medium">Read More →</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {filteredArticles.length > articlesToShow && <div ref={sentinelRef} className="py-8 text-center text-muted-foreground">Loading more articles...</div>}
        </div>
      </main>
    </div>
  );
};

export default Articles;