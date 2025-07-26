import React, { useState, useRef } from 'react'; // Import useRef
import { Button } from './ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import ScienceEyeLogo from './ScienceEyeLogo';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGetInvolvedDropdown, setShowGetInvolvedDropdown] = useState(false);
  const dropdownHideTimeout = useRef(null); // Create a ref to store the timeout ID

  const handleMouseEnter = () => {
    // Clear any existing timeout to prevent it from closing if re-entered quickly
    if (dropdownHideTimeout.current) {
      clearTimeout(dropdownHideTimeout.current);
    }
    setShowGetInvolvedDropdown(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to hide the dropdown after a delay (e.g., 300ms)
    dropdownHideTimeout.current = setTimeout(() => {
      setShowGetInvolvedDropdown(false);
    }, 300); // Adjust this value (in milliseconds) for longer delay
  };

  const navItems = [
    { label: 'Home', href: '#/' },
    { label: 'GlimpseArticles', href: '#/articles' },
    { label: 'About', href: '#/about' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <ScienceEyeLogo className="w-10 h-10" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground">ScienceGlimpse</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            {navItems.map(item => (
              <a key={item.label} href={item.href} className="text-foreground hover:text-primary transition-colors duration-300 hover:scale-105 transform">
                {item.label}
              </a>
            ))}

            {/* Get Involved Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter} // Use the new handler
              onMouseLeave={handleMouseLeave} // Use the new handler
            >
              <button className="text-foreground hover:text-primary transition-colors duration-300 hover:scale-105 transform flex items-center gap-1">
                Get Involved
                <ChevronDown className="w-4 h-4" />
              </button>
              {showGetInvolvedDropdown && (
                <div className="absolute top-full mt-2 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[120px] z-50">
                  <a href="#/submission" className="block px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition-colors">
                    Publish
                  </a>
                  <a href="#/donate" className="block px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition-colors">
                    Donate
                  </a>
                  <a href="#/contact" className="block px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition-colors">
                    Contact
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-sm border border-border rounded-lg mt-2 p-4 mb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map(item => (
                <a key={item.label} href={item.href} className="text-foreground hover:text-primary transition-colors duration-300 py-2 px-3 rounded-md hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              <div className="border-t border-border pt-3 mt-3">
                <p className="text-sm font-medium text-muted-foreground mb-2">Get Involved</p>
                <a href="#/submission" className="block text-foreground hover:text-primary transition-colors duration-300 py-2 px-3 rounded-md hover:bg-muted ml-4" onClick={() => setIsMenuOpen(false)}>
                  Publish
                </a>
                <a href="#/donate" className="block text-foreground hover:text-primary transition-colors duration-300 py-2 px-3 rounded-md hover:bg-muted ml-4" onClick={() => setIsMenuOpen(false)}>
                  Donate
                </a>
                <a href="#/contact" className="block text-foreground hover:text-primary transition-colors duration-300 py-2 px-3 rounded-md hover:bg-muted ml-4" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
