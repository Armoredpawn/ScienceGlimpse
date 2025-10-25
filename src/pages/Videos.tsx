import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import videosData from '@/data/videos.json';

const Videos = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialToLoad = 9;
  const perScroll = 6;
  const [shown, setShown] = useState(initialToLoad);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (loading || shown >= videosData.length) return;
    setLoading(true);
    setTimeout(() => {
      setShown(prev => Math.min(prev + perScroll, videosData.length));
      setLoading(false);
    }, 500);
  }, [loading, shown]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading && shown < videosData.length) {
        loadMore();
      }
    }, { rootMargin: '100px' });

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [loading, shown, loadMore]);

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
              ScienceGlimpse Shorts
            </h1>
          </div>

          {/* YouTube Shorts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videosData.slice(0, shown).map((video) => (
              <article
                key={video.id}
                className="group bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* YouTube Embed */}
                <div className="aspect-[9/10] overflow-hidden bg-muted">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Caption */}
                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h2>
                  {video.author && (
                    <p className="text-sm text-muted-foreground">By {video.author}</p>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(`https://www.youtube.com/shorts/${video.youtubeId}`, '_blank')
                    }
                  >
                    Watch on YouTube →
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Infinite Scroll */}
          {videosData.length > shown && (
            <div ref={sentinelRef} className="py-8 text-center text-muted-foreground">
              {loading ? 'Loading more videos...' : 'Scroll down to load more'}
            </div>
          )}

          {shown >= videosData.length && (
            <div className="py-8 text-center text-muted-foreground">
              You’ve reached the end of the Shorts.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Videos;
