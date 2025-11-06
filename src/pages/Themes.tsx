import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Clock, User, ArrowRight } from 'lucide-react';

const Index = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  // Define your themes data
  const themes = [
    {
      id: 'creature',
      field: 'Creature Profile',
      emoji: '🐯',
      to: '/creatureprofile',
      gradient: 'from-red-300 to-orange-700 saturate-600',
      category: 'Living Beings',
      readTime: '4-6 min',
      excerpt: 'Fascinating facts about real-life animals, past and present.',
    },
    {
      id: 'junior',
      field: 'Junior',
      emoji: '😄',
      to: '/juniorarticles',
      gradient: 'from-green-200 to-yellow-600',
      category: 'Junior Education',
      readTime: '3-5 min',
      excerpt: 'Fun, kid-friendly science stories tailored to the growing mind.',
    },
    {
      id: 'debunked',
      field: 'Debunked',
      emoji: '🕵️‍♂️',
      to: '/debunkedarticles',
      gradient: 'from-indigo-500 to-purple-600',
      category: 'Myth Busting',
      readTime: '5 min',
      excerpt: 'Unraveling popular science myths with real facts and evidence.',
    },
    {
      id: 'whatif',
      field: 'What If?',
      emoji: '🤔',
      to: '/whatifarticles',
      gradient: 'from-black-500 to-white-600',
      category: 'Curiosity',
      readTime: '5 min',
      excerpt: 'Exploring wild science questions and imaginative scenarios in our world.',
    },
    {
      id: 'how',
      field: 'How???',
      emoji: '😕',
      to: '/howarticles',
      gradient: 'from-black-500 to-white-600',
      category: 'Explanation',
      readTime: '5 min',
      excerpt: 'Explaining how insane science concepts and topics work.',
    },
  ];

  return (  
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated Science Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <section className="py-20 px-4 bg-muted/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl bg-gradient-to-r from-quantum to-cosmic bg-clip-text mb-8 py-[15px] px-0 text-[#5910d9] md:text-4xl font-bold">
              Explore Our Themes!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {themes.map((theme) => (
                <div key={theme.id} className="group">
                  <div className="card-glow h-full p-6 rounded-xl relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {theme.category}
                        </span>
                        <span className="text-3xl group-hover:animate-bounce hover:scale-110 transition-transform duration-300">
                          {theme.emoji}
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold transition-colors duration-300 text-slate-50 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                        {theme.field}
                      </h3>

                      <div className="border border-border p-4 rounded-lg bg-background/50">
                        <p className="text-muted-foreground leading-relaxed">
                          {theme.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{theme.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <Link to={theme.to}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="group-hover:text-primary"
                          >
                            Explore Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer placeholder for future expansion */}
        <footer className="py-16 px-4 border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2025 ScienceGlimpse. Made with curiosity by students, for students.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/submission" className="hover:text-primary transition-colors">Apply to Write</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;