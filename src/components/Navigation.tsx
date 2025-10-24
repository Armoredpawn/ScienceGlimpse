import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import ScienceEyeLogo from './ScienceEyeLogo';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#/' },
    { label: 'GlimpseArticles', href: '#/articles' },
    { label: 'About', href: '#/about' },
    { label: 'Themes', href: '#/themes' },
    { label: 'Publish', href: '#/submission' },
    { label: 'Contact', href: '#/contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <ScienceEyeLogo className="w-10 h-10" />
            <h1 className="text-xl font-bold text-foreground select-none">ScienceGlimpse</h1>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8 mx-auto">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 hover:scale-105 transform py-2 px-1"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right-side controls */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-sm border border-border rounded-lg mt-2 p-4 mb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 py-2 px-3 rounded-md hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-3 border-t border-border mt-3">
                {/* Theme toggle in mobile menu */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
