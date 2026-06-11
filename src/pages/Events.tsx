import React, { useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import Image1 from '@/assets/foodandfun.png';
import Image2 from '@/assets/livespeaker.png';
import Image3 from '@/assets/handsonstalls.png';
import Image4 from '@/assets/location.png';
import Image5 from '@/assets/whoitsfor.png';

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
              Coming Soon · June 20, 2026, 11 AM - 3 PM
            </p>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-quantum via-neuron to-cosmic bg-clip-text text-transparent mb-6 leading-tight">
              Northland Public Library<br />Event
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              A free, student-run science event at the Northland Public Library — open to children, families, and anyone who loves science. Come explore, create, and be inspired.
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
              A 4 hour afternoon packed with science, creativity, and community. Here's a glimpse of what's in store.
            </p>

            {/* Single row of cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventHighlights.map((item) => (
                <div
                  key={item.label}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300"
                >
                  {item.label === "Hands-On Stalls" && (
                    <img
                      src={Image3}
                      alt="Hands-on stalls"
                      className="w-full h-48 object-cover"
                    />
                  )}

                  {item.label === "Live Speaker" && (
                    <img
                      src={Image2}
                      alt="Live science speaker"
                      className="w-full h-48 object-cover"
                    />
                  )}

                  {item.label === "Food & Fun" && (
                    <img
                      src={Image1}
                      alt="Foodandfun"
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-6">
                    <h3 className={`text-lg font-semibold mb-2 ${item.color}`}>
                      {item.label}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
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
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
                <img
                  src={Image4}
                  alt="Northland Public Library"
                  className="w-full h-56 object-cover"
                />

                <div className="p-8">
                  <h3 className="text-quantum font-semibold text-lg mb-3">
                    Location
                  </h3>

                  <div className="space-y-2">
                    <p className="text-foreground font-medium">
                      Northland Public Library
                    </p>

                    <p className="text-sm text-quantum font-medium">
                      300 Cumberland Rd, Pittsburgh, PA 15237
                    </p>

                    <p className="text-sm text-cosmic font-medium">
                      June 20, 2026 • 11:00 AM – 3:00 PM
                    </p>

                    <p className="text-muted-foreground text-sm">
                      Stalls set up indoors and under the main awning. Exact floor layout to be confirmed.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
                <img
                  src={Image5}
                  alt="Children and families enjoying science activities"
                  className="w-full h-56 object-cover"
                />

                <div className="p-8">
                  <h3 className="text-cosmic font-semibold text-lg mb-3">
                    Who It's For
                  </h3>

                  <p className="text-foreground font-medium">
                    Children, Families & Science Enthusiasts
                  </p>

                  <p className="text-muted-foreground text-sm mt-2">
                    All ages welcome. Most activities are designed for kids and young teens,
                    but everyone will find something to enjoy.
                  </p>
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-quantum font-semibold text-lg mb-2">Participate</h3>
                <p className="text-muted-foreground text-sm">Through fun experiments, challenges, and games, participants will explore scientific concepts while learning and having fun. </p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-neuron font-semibold text-lg mb-2">
                  Volunteer
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  Help run stalls, assist visitors, set up activities, and support the event throughout the day.
                </p>

                <a
                  href="https://www.signupgenius.com/go/10C0448AFAF2DA4FAC43-64460378-scienceglimpse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium hover:opacity-90 transition-all"
                >
                  Apply to Volunteer
                </a>
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