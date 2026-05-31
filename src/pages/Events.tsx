import React, { useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';

const eventHighlights = [
  {
    label: "Hands-On Stalls",
    color: "text-quantum",
    desc: "Interactive science experiments and DIY crafts for kids and families to explore together."
  },
  {
    label: "Live Speaker",
    color: "text-neuron",
    desc: "A science professional giving a short, engaging live demonstration open to all attendees."
  },
  {
    label: "Food & Fun",
    color: "text-cosmic",
    desc: "Snacks and refreshments available, with all proceeds supporting our charity partner."
  },
  {
    label: "Writing Competition",
    color: "text-quantum",
    desc: "Sign up to write a science article for ScienceGlimpse with cash prizes up for grabs."
  },
  {
    label: "Photo Booth",
    color: "text-neuron",
    desc: "Dress up in lab coats and goggles for a fun science-themed photo moment."
  },
];

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

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

  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-20">

        {/* Hero */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-quantum font-semibold mb-4">
              Coming Soon · June 20, 2025
            </p>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-quantum via-neuron to-cosmic bg-clip-text text-transparent mb-6 leading-tight">
              Northland Public Library<br />Event
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              A free, student-run science event at the Northland Library — open to children, families, and anyone who loves science. Come explore, create, and be inspired.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Event Begins In
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold text-quantum">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    DAYS
                  </div>
                </div>

                <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold text-neuron">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    HOURS
                  </div>
                </div>

                <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold text-cosmic">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    MINUTES
                  </div>
                </div>

                <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    SECONDS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect — 5 cards: 2 on top, 3 on bottom */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neuron to-cosmic bg-clip-text text-transparent mb-4 text-center">
              What to Expect
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              A 4–5 hour afternoon packed with science, creativity, and community. Here's a glimpse of what's in store.
            </p>

            {/* Top row: 2 cards centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
              {eventHighlights.slice(0, 2).map((item) => (
                <div
                  key={item.label}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-300"
                >
                  <h3 className={`text-lg font-semibold mb-2 ${item.color}`}>{item.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Bottom row: 3 cards full width */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {eventHighlights.slice(2).map((item) => (
                <div
                  key={item.label}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-300"
                >
                  <h3 className={`text-lg font-semibold mb-2 ${item.color}`}>{item.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Details — 2 cards, full-width each */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-quantum to-neuron bg-clip-text text-transparent mb-10 text-center">
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-8">
                <h3 className="text-quantum font-semibold text-lg mb-3">Location</h3>
                <p className="text-foreground font-medium">Northland Library</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Stalls set up indoors and under the main awning. Exact floor layout to be confirmed.
                </p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-8">
                <h3 className="text-cosmic font-semibold text-lg mb-3">Who It's For</h3>
                <p className="text-foreground font-medium">Children, Families & Science Enthusiasts</p>
                <p className="text-muted-foreground text-sm mt-1">
                  All ages welcome. Most activities are designed for kids and young teens, but everyone will find something to enjoy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved — 2 cards, centered */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cosmic to-neuron bg-clip-text text-transparent mb-4">
              Get Involved
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              This event is entirely student-run. Whether you want to volunteer, spread the word, or just show up — we'd love to have you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-neuron font-semibold text-lg mb-2">Volunteer</h3>
                <p className="text-muted-foreground text-sm">Help run stalls, set up, or assist on the day. Reach out through our contact page to express interest.</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-quantum font-semibold text-lg mb-2">Spread the Word</h3>
                <p className="text-muted-foreground text-sm">Share the event with your school, community, or family. Follow us on Instagram and TikTok for updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2026 ScienceGlimpse. Made with curiosity by students, for students.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Newsletter</a>
              <a href="#" className="hover:text-primary transition-colors">Workshops</a>
              <a href="#/submission" className="hover:text-primary transition-colors">Apply to Write</a>
              <a href="#/contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Events;