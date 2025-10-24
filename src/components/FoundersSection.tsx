import React from 'react';
import { Quote } from 'lucide-react';
interface Founder {
  name: string;
  role: string;
  mission: string;
  favoriteFields: string[];
  quote: string;
  gradient: string;
}
const FoundersSection = () => {
  const founders: Founder[] = [{
    name: 'Medhansh Garadala',
    role: 'Co-Founder: Executive Director & Head of Logistics',
    mission: 'Making complex quantum concepts accessible to every curious mind.',
    favoriteFields: ['⚛️', '🧠', '🌌'],
    quote: 'Science isn\'t about memorizing — it\'s about glimpsing the truth behind the universe\'s most beautiful and facinating mysteries.',
    gradient: 'from-quantum to-cosmic'
  }, {
    name: 'Ansh Sharma',
    role: 'Co-Founder: Director of Strategy & Lead Task Manager',
    mission: 'Blending storytelling with clarity to make research irresistible.',
    favoriteFields: ['⚛️', '🌌', '🔬'],
    quote: 'We don\'t simplify science. We clarify it. There\'s a huge difference between the two — and it changes everything.',
    gradient: 'from-molecule to-neuron'
  }, {
    name: 'Aarav Madan',
    role: 'Co-Founder: Director of Media & Creative Innovation',
    mission: 'To craft visual and narrative experiences that bring science to life—capturing wonder, curiosity, and design in every frame.',
    favoriteFields: ['⚙️', '💻', '🌍'],
    quote: 'Creativity is the science of seeing differently than your peers—then actually making it real.',
    gradient: 'from-neuron to-cosmic'
  }, {
    name: 'Ayush Srivastava',
    role: 'Co-Founder: Head Programmer & Lead Technical Coder',
    mission: 'The future belongs to those who question the present and construct the programming of tomorrow.',
    favoriteFields: ['⚙️', '💻', '🧪'],
    quote: 'Good code is what makes a website clear and functional. Great code is what makes a website unforgettable.',
    gradient: 'from-cosmic to-quantum'
  }, {
    name: 'Kavin Puri',
    role: 'Co-Founder: Head Developer & Lead Science Content Advisor',
    mission: 'To fuse elegant design with clear information & talented members and channel a universe of scientific innovation.',
    favoriteFields: ['🧬', '💻', '🩺'],
    quote: 'Every great team needs a great developer at its core to bring their vision to life & build towards the future of scientific collaboration.',
    gradient: 'from-quantum to-molecule'
  }, {
    name: 'Saanvi Palagani',
    role: 'Co-Founder: Chief Editor & Publicity Director',
    mission: 'To amplify voices that turn raw ideas into crystal-clear narratives—making science accessible, bold, and beautiful.',
    favoriteFields: ['🧬', '🧠', '⚗️'],
    quote: 'Define Science.',
    gradient: 'from-molecule to-neuron'
  },{
    name: 'Mihir Harinath',
    role: 'Co-Founder: Lead Advisor & Event Organizer',
    mission: 'To orchestrate spaces where people connect and visions take teams with passion to create meaningful experiences.',
    favoriteFields: ['⚙️', '💻', '🌎'],
    quote: 'seeeegma?',
    gradient: 'from-neuron to-cosmic'    
  }

];
  return <section className="py-20 px-4 bg-muted/30" id="team">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neuron to-cosmic bg-clip-text text-transparent mb-6">
            The Minds Behind the Glimpse
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Student researchers, science communicators, and dreamers building the future of scientific storytelling for generations to come.</p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {founders.map((founder, index) => <div key={founder.name} className="group">
              <div className="card-glow h-full p-8 rounded-xl relative overflow-hidden">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${founder.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Name and Role */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {founder.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {founder.role}
                    </p>
                  </div>

                  {/* Favorite Fields */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground font-medium">Favorite Fields:</span>
                    <div className="flex space-x-2">
                      {founder.favoriteFields.map((emoji, i) => <span key={i} className="text-2xl group-hover:animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer">
                          {emoji}
                        </span>)}
                    </div>
                  </div>

                  {/* Mission */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Mission</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {founder.mission}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 relative">
                    <Quote className="absolute top-2 left-2 w-4 h-4 text-primary/50" />
                    <blockquote className="text-foreground/90 italic pl-6 leading-relaxed">
                      {founder.quote}
                    </blockquote>
                  </div>

                  {/* Special badges for all team members */}
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neuron rounded-full animate-pulse-glow" />
                    <span className="text-xs text-neuron font-medium">Active Team Member</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Want to Join Our Mission?</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for passionate student researchers and science communicators to join our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-transparent border border-border px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-muted/50"
                onClick={() => window.location.href = '#/submission'}
              >
                Apply to Write
              </button>
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                onClick={() => window.location.href = '#/contact'}
              >
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default FoundersSection;
