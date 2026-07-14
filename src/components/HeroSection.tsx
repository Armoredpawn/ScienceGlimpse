import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import './HeroSection.css'; // Import the CSS for animation

const HeroSection = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("2026-06-20T11:00:00-04:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor(
          (distance % (1000 * 60)) / 1000
        ),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Main Brand */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold flowing-gradient-text bg-clip-text text-transparent leading-tight">
            ScienceGlimpse
          </h1>
          <h2 className="text-2xl md:text-4xl text-foreground/90 leading-tight font-extralight lg:text-4xl">
            A 5-Minute Glimpse Into the
            <span className="block">Universe of Science</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed md:text-xl font-bold">
            From black holes to brainwaves — science, decoded and reimagined
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 flex justify-center w-full max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/submission')}
              className="glow-action-btn-purple bg-blue-700 hover:bg-purple-700 text-white text-lg py-4 transition-all duration-300 border border-black"
            >
              Submit Your Article →
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/themes')}
              className="glow-action-btn-green bg-green-700 text-lg py-4 transition-all duration-300"
            >
              Themes
            </Button>
          </div>
        </div>

        {/* Stats or Quote */}
        <div className="pt-8">
          <div className="max-w-xl mx-auto pt-8">
            <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-neuron to-cosmic bg-clip-text text-transparent mb-4">
              Northland Library Event Begins In
            </p>

            <div className="grid grid-cols-4 gap-3">
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-3">
                <div className="text-2xl md:text-3xl font-bold text-cosmic">
                  {timeLeft.days}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  DAYS
                </div>
              </div>

              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-3">
                <div className="text-2xl md:text-3xl font-bold text-cosmic">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  HOURS
                </div>
              </div>

              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-3">
                <div className="text-2xl md:text-3xl font-bold text-cosmic">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  MINUTES
                </div>
              </div>

              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-3">
                <div className="text-2xl md:text-3xl font-bold text-cosmic">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  SECONDS
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <p className="text-sm text-muted-foreground">
                June 20, 2026 • 11:00 AM EDT
              </p>

              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/events')}
                className="bg-purple-700 hover:bg-blue-700 text-white"
              >
                Learn more →
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pt-12 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;