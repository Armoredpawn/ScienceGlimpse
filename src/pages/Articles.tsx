import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, Clock, User, Tag } from 'lucide-react';

// Attempting to resolve paths by assuming they are directly under '/app/' as indicated by compilation errors.
// This is a direct approach to address the 'Could not resolve "/app/..."' messages.
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import articlesData from '@/data/articles.json';

const Articles = () => {
  // Scrolls to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use useSearchParams to get category from the URL
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  // State to manage the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  // The full list of articles from the JSON file
  const allArticles = articlesData;

  // Filter articles based on the selected category and search term
  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = !category || article.category === category;
    const matchesSearch = !searchTerm ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Infinite Scrolling Logic
  const initialArticlesToLoad = 16; // Number of articles to display initially
  const articlesToLoadPerScroll = 9; // Number of new articles to load on each scroll
  const [articlesToShow, setArticlesToShow] = useState(initialArticlesToLoad);
  const [loadingMore, setLoadingMore] = useState(false); // Flag to prevent multiple simultaneous loads

  // Ref for the sentinel element that triggers loading more articles
  const sentinelRef = useRef(null);

  // Function to load more articles, wrapped in useCallback for performance
  const loadMoreArticles = useCallback(() => {
    // If already loading or no more articles to show, do nothing
    if (loadingMore || articlesToShow >= filteredArticles.length) {
      return;
    }

    setLoadingMore(true); // Indicate that more articles are being loaded
    // Simulate a network request delay
    setTimeout(() => {
      // Update the number of articles to show, ensuring it doesn't exceed total filtered articles
      setArticlesToShow(prev => Math.min(prev + articlesToLoadPerScroll, filteredArticles.length));
      setLoadingMore(false); // Reset loading state
    }, 500); // 500ms delay for simulation
  }, [loadingMore, articlesToShow, filteredArticles.length]); // Dependencies for useCallback

  // useEffect hook to set up and clean up the Intersection Observer
  useEffect(() => {
    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver(entries => {
      // If the sentinel is intersecting (visible) and we're not already loading
      // and there are still more articles to potentially load
      if (entries[0].isIntersecting && !loadingMore && articlesToShow < filteredArticles.length) {
        loadMoreArticles(); // Trigger loading of more articles
      }
    }, {
      rootMargin: '100px', // Start loading when sentinel is 100px from the bottom of the viewport
    });

    // Start observing the sentinel element if it exists
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts or dependencies change
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loadingMore, articlesToShow, filteredArticles.length, loadMoreArticles]); // Dependencies for useEffect

  // Helper object to map category keys to display names
  const categoryNames = {
    Physics: 'Physics',
    Biology: 'Biology',
    Chemistry: 'Chemistry',
    Astronomy: 'Astronomy',
    Medicine: 'Medicine',
    Technology: 'Technology',
    Engineering: 'Engineering',
    'Earth-science': 'Earth Science',
    Psychology: 'Psychology',
    Math: 'Math'
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background animation component */}
      <AnimatedBackground />
      {/* Navigation bar component */}
      <Navigation />

      <main className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => window.history.back()} // Go back to the previous page
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-quantum via-molecule to-neuron bg-clip-text text-transparent mb-4">
              {/* Display category name if selected, otherwise 'All Articles' */}
              {category ? `${categoryNames[category]} Articles` : 'All Articles'}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              Discover the latest insights and breakthroughs in science
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                className="pl-10"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map over a slice of filtered articles to implement infinite scrolling */}
            {filteredArticles.slice(0, articlesToShow).map((article) => (
              <article
                key={article.id}
                // Make the entire card clickable to navigate to the article page
                onClick={() => window.location.href = `#/article?id=${article.id}`}
                className="group bg-card/60 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    // Fallback for broken images with a placeholder
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/400x225/2d3748/ffffff?text=No+Image`; }}
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

                    {/* This button is now for visual consistency; the parent card handles navigation */}
                    <Button size="sm" variant="outline">
                      Read More →
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Infinite Scroll Sentinel and Status Messages */}
          {/* Show sentinel if there are more articles to load */}
          {filteredArticles.length > 0 && articlesToShow < filteredArticles.length && (
            <div ref={sentinelRef} className="py-8 text-center text-muted-foreground">
              {loadingMore ? 'Loading more articles...' : 'Scroll down to load more articles'}
            </div>
          )}

          {/* Show "No more content" message when all articles are loaded */}
          {filteredArticles.length > 0 && articlesToShow >= filteredArticles.length && (
            <div className="py-8 text-center text-muted-foreground">
              You've reached the end of the articles.
            </div>
          )}

          {/* Message for when no articles are found due to filters */}
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
