import React from 'react';
import { Button } from './ui/button';


const WhatIsScienceGlimpse = () => {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden text-gray-100">
      {/* 
      // TODO: Uncomment these once image files are added to /public/assets/
      <img
        src="/assets/brain.png"
        alt="Brain"
        className="absolute top-6 left-6 w-28 opacity-90 animate-pulse"
      />

      <img
        src="/assets/planet.png"
        alt="Planet"
        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 rotate-12 animate-spin-slow"
      />

      <img
        src="/assets/pendulum.png"
        alt="Pendulum"
        className="absolute bottom-8 right-8 w-28 animate-bounce"
      />
      */}

      {/* Transparent backdrop (lets animated background show through) */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
        {/* Text Section */}
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            WHAT IS{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
              SCIENCEGLIMPSE?
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-blue-300 font-semibold mb-6">
            By Students, <br /> For Everyone
          </h2>

          <p className="text-lg leading-relaxed text-gray-200 max-w-2xl">
            ScienceGlimpse is a student-led exploration site designed for anyone
            interested in learning more about a scientific topic or writing a
            science article. Our mission is to do the opposite of what every
            other scientific article does by providing a concise 5-minute
            article that conveys the main information, current applications in
            the scientific community, and the key breakthroughs we have observed
            — all in an engaging and meaningful way.
          </p>
          
          {/* Learn More Button */}
          <div className="text-left mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8glow-action-btn-green text-lg py-4 transition-all duration-300"
            onClick={() => (window.location.href = '#/about')}
          >
            Learn More
          </Button>
        </div>
        </div>

        {/* Video Placeholder */}
        {/* YouTube Shorts Embed */}
        <div className="flex-1 flex justify-center">
          <div className="w-80 h-[450px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.5)] border-4 border-purple-500/70">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/b8bBDGtRftU"
              title="ScienceGlimpse Shorts"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Subtle animated gradient overlay (still visible) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-transparent animate-pulse pointer-events-none" />
    </section>
  );
};

export default WhatIsScienceGlimpse;
