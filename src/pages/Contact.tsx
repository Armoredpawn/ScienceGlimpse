import React from 'react';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Mail, Users, HelpCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions that need answering? Want to collaborate? We'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* GET IN TOUCH Section */}
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">GET IN TOUCH</h2>
              </div>
              <div className="space-y-4">
                <p className="text-foreground">
                  <a href="mailto:ScienceGlimpse25@gmail.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted">
                    <span>✉</span>
                    <span>ScienceGlimpse25@gmail.com</span>
                  </a>
                </p>
                <div>
                  <p className="font-medium text-foreground mb-2">Response Time</p>
                  <p className="text-muted-foreground">We typically respond within 24–48 hours</p>
                </div>
              </div>
            </div>

            {/* FOLLOW US Section */}
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Follow Us</h2>
              </div>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted">
                  <span>📧</span>
                  <span>TikTok (Weekly Science Glimpses)</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted">
                  <span>📸</span>
                  <span>Instagram (@ScienceGlimpse)</span>
                </a>
                <a href="https://www.youtube.com/channel/UChziIqWZasnGmBC1TrA1jNQ" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted">
                  <span>🎥</span>
                  <span>YouTube (ScienceGlimpse Shorts)</span>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 mb-16">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">How do I publish my article?</h3>
                <p className="text-muted-foreground">
                  Submit your article through our submission form. Our editorial team will review it within 2–3 business days and provide feedback. Once approved, we'll work with you to publish it on our platform.
                </p>
              </div>
              
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Is ScienceGlimpse completely free?</h3>
                <p className="text-muted-foreground">
                  Yes!!! And if you are from the North Allegheny district and would like to author articles, please consider joining our club!
                </p>
              </div>
              
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">What kind of articles do you accept?</h3>
                <p className="text-muted-foreground">
                  We welcome articles on any science topic written by students. They should be 800–1500 words, accessible to high school students, and properly cited. We love unique perspectives and engaging writing!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
