import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import FoundersSection from '@/components/FoundersSection';
const About = () => {
  return <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated Science Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* Header */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-quantum to-cosmic bg-clip-text text-transparent mb-8">
              About ScienceGlimpse:
            </h1>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neuron to-cosmic bg-clip-text text-transparent mb-8 text-center">
              Our Mission
            </h2>
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-8">
              {/* <p className="text-2xl text-foreground leading-relaxed text-center font-semibold">Our mission is to educate and inspire by making science accessible, engaging, and relevant to everyday life. We explore a wide range of scientific topics to spark curiosity and empower the next generation of thinkers, innovators, and world-changers. Through creative storytelling and interactive learning, we believe that understanding how the world around us works is key to shaping a better future—for everyone.</p> */}
              <p className="text-2xl text-foreground leading-relaxed text-center font-semibold">Our mission is to educate and inspire by making science <span className="text-quantum">accessible</span>, <span className="text-neuron">engaging</span>, and <span className="text-cosmic">relevant to everyday life</span>. We explore a wide range of scientific topics to spark curiosity and <span className="text-neuron">empower the next generation</span> of thinkers, innovators, and world-changers. <br></br><br></br>Through <span className="text-cosmic">creative storytelling and interactive learning</span>, we believe that understanding how the world around us works is key to <span className="text-neuron">shaping a better future</span> for everyone.</p>
            </div>
          </div>
        </section>

        {/* Our Impact
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-molecule to-neuron bg-clip-text text-transparent mb-12 text-center">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-8 text-center card-glow">
                <div className="text-4xl md:text-5xl font-bold text-quantum mb-4">
                  150+
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Articles Published</h3>
                <p className="text-muted-foreground">
                  Comprehensive science articles covering cutting-edge research across multiple disciplines.
                </p>
              </div>
              
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-8 text-center card-glow">
                <div className="text-4xl md:text-5xl font-bold text-neuron mb-4">
                  25+
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Student Authors</h3>
                <p className="text-muted-foreground">
                  Passionate student researchers and science communicators from around the world.
                </p>
              </div>
              
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-8 text-center card-glow">
                <div className="text-4xl md:text-5xl font-bold text-cosmic mb-4">
                  50+
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Schools Reached</h3>
                <p className="text-muted-foreground">
                  Educational institutions worldwide using our content to inspire the next generation.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Team Section */}
        <FoundersSection />

        {/* Footer */}
        <footer className="py-16 px-4 border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2025 ScienceGlimpse. Made with curiosity by students, for students.
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
    </div>;
};
export default About;
