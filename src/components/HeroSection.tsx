import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Main Brand */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-quantum via-molecule to-neuron bg-clip-text text-transparent leading-tight">
            ScienceGlimpse
          </h1>
          
          <h2 className="text-2xl md:text-4xl text-foreground/90 leading-tight font-extralight lg:text-4xl">
            A 5-Minute Glimpse Into the 
            <span className="block">Universe of Science</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed md:text-xl font-bold">From black holes to brainwaves — science, decoded and reimagined</p>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 flex flex-wrap justify-center gap-4">
          <Button variant="default" size="lg" onClick={() => window.location.href = '#/submission'} className="bg-purple-600 hover:bg-purple-700 text-white text-lg">
            Submit Your Article →
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.location.href = '#/about'} className="text-lg">
            Our Mission
          </Button>
          <Button variant="default" size="lg" onClick={() => window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSdXWxqo9fR7gXag4xP43M1rQIsc1Bdn9SlktHivOLNJyn4OXQ/viewform?usp=dialog'} className="bg-purple-600 hover:bg-purple-700 text-white text-lg">
            Vote Article →
          </Button>
        </div>

        {/* Stats or Quote */}
        <div className="pt-8">
          
        </div>

        {/* Scroll indicator */}
        <div className="pt-12 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto" />
        </div>
      </div>
    </section>;
};
export default HeroSection;
