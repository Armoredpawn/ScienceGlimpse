import React, { useState, useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HotSights from '@/components/HotSights';
import ArticleFeed from '@/components/ArticleFeed';
import FoundersSection from '@/components/FoundersSection';
import WhatIsScienceGlimpse from '@/components/WhatIsScienceGlimpse';

type Category = {
  field: string;
  icon: string;
  tag: string;
  className: string;
};

const Index: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPopupOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const goToCategory = (tag: string) => {
    window.location.href = `#/articles?category=${encodeURIComponent(tag)}`;
  };

  const categories: Category[] = [
    { field: 'Physics', icon: '⚛️', tag: 'Physics', className: 'category-physics' },
    { field: 'Biology', icon: '🧬', tag: 'Biology', className: 'category-biology' },
    { field: 'Chemistry', icon: '🧪', tag: 'Chemistry', className: 'category-chemistry' },
    { field: 'Astronomy', icon: '🌌', tag: 'Astronomy', className: 'category-astronomy' },
    { field: 'Medicine', icon: '🩺', tag: 'Medicine', className: 'category-medicine' },
    { field: 'Technology', icon: '💻', tag: 'Technology', className: 'category-technology' },
    { field: 'Earth Science', icon: '🌍', tag: 'Earth Science', className: 'category-earth' },
    { field: 'Engineering', icon: '⚙️', tag: 'Engineering', className: 'category-engineering' },
    { field: 'Psychology', icon: '🧠', tag: 'Psychology', className: 'category-psychology' },
    { field: 'Math', icon: '🔢', tag: 'Math', className: 'category-math' },
    { field: 'Artificial Intelligence', icon: '🤖', tag: 'Artificial Intelligence', className: 'category-ai' },
    { field: 'Data Science', icon: '📊', tag: 'Data Science', className: 'category-data' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">

      <AnimatedBackground />

      <Navigation />

      <main className="relative z-10">

        <HeroSection />

        <WhatIsScienceGlimpse centerText={true} paragraphSize="normal" />

        <HotSights />

        <section className="py-24 px-4 bg-muted/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neuron to-cosmic bg-clip-text text-transparent mb-4 py-[12px]">
              What's YOUR Obsession?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore focused topics across physics, biology, chemistry, astronomy, medicine, technology and more — concise articles and guides to spark your curiosity.
            </p>
            <div className="grid grid-cols-5 grid-rows-3 gap-6 mb-8">
              {categories.map((item) => (
                <button
                  key={item.tag}
                  onClick={() => goToCategory(item.tag)}
                  className={`${item.className} aspect-square flex flex-col items-center justify-center bg-card/60 border border-border backdrop-blur-md rounded-2xl p-4 text-center transition-all duration-300 group`}
                  aria-label={item.field}
                >
                  <div className="text-4xl mb-2 group-hover:animate-bounce">{item.icon}</div>
                  <div className="text-sm font-semibold text-foreground bg-gray-500 rounded-full px-4 py-1">
                    {item.field}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <ArticleFeed />

        {/* <FoundersSection /> */}

        <footer className="py-16 px-4 border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2025 ScienceGlimpse. Made with curiosity by students, for everyone.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#/about" className="hover:text-primary transition-colors">About</a>
              <a href="#/submission" className="hover:text-primary transition-colors">Apply to Write</a>
              <a href="#/contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </footer>

      </main>

      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsPopupOpen(false)}
        />
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl p-8 pointer-events-auto">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
            >
              ✕
            </button>
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Upcoming Event
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              ScienceGlimpse Event at Northland Public Library!
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              June 20, 2026 &nbsp;·&nbsp; Northland Public Library
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              The purpose of this event is to spread the love of science, get kids interested in the field of science, spread the message of ScienceGlimpse, and allow for people to make donations to an amazing cause.
            </p>
            
            <a href="#about"
              className="block w-full text-center bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              Learn More!
            </a>
          </div>
        </div>
      )}

      {!isPopupOpen && (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition-all"
        >
          Upcoming Event!
        </button>
      )}

    </div>
  );
};

export default Index;