import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HotSights from '@/components/HotSights';
import ArticleFeed from '@/components/ArticleFeed';
import FoundersSection from '@/components/FoundersSection';
const Index = () => {
  return <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated Science Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Hot Sights */}
        <HotSights />
        
        {/* Article Feed */}
        <ArticleFeed />
        
        {/* What's YOUR obsession? Section */}
        <section className="py-20 px-4 bg-muted/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl bg-gradient-to-r from-quantum to-cosmic bg-clip-text mb-8 py-[15px] px-0 text-[#5910d9] md:text-4xl font-bold">
              What's YOUR Obsession?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
              {[
                { field: 'Physics', icon: '⚛️', tag: 'Physics' },
                { field: 'Biology', icon: '🧬', tag: 'Biology' },
                { field: 'Chemistry', icon: '🧪', tag: 'Chemistry' },
                { field: 'Astronomy', icon: '🌌', tag: 'Astronomy' },
                { field: 'Medicine', icon: '🩺', tag: 'Medicine' },
                { field: 'Technology', icon: '💻', tag: 'Technology' },
                { field: 'Earth Science', icon: '🌍', tag: 'Earth-science' },
                { field: 'Engineering', icon: '⚙️', tag: 'Engineering' },
              ].map((item) => (
                <button
                  key={item.tag}
                  onClick={() => (window.location.href = `#/articles?category=${item.tag}`)}
                  className="aspect-square flex flex-col items-center justify-center bg-card/60 border border-border backdrop-blur-md rounded-2xl p-4 text-center hover:bg-card/80 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.05] transition-all duration-300 group"
                >
                  <div className="text-4xl mb-2 group-hover:animate-bounce">{item.icon}</div>
                  <div className="text-sm font-semibold text-foreground bg-gray-700 rounded-full px-4 py-1">
                    {item.field}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Founders Section */}
        <FoundersSection />
        
        {/* Footer placeholder for future expansion */}
        <footer className="py-16 px-4 border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2025 ScienceGlimpse. Made with curiosity by students, for students.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-muted-foreground">
              {/* <a href="#/donate" className="hover:text-primary transition-colors">Donate</a> */}
              <a href="#/about" className="hover:text-primary transition-colors">About</a>
              <a href="#/submission" className="hover:text-primary transition-colors">Apply to Write</a>
              <a href="#/contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>;
};
export default Index;