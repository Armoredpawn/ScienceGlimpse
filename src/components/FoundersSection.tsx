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
    favoriteFields: ['🔬', '🌌', '⚛️'],
    quote: 'We don\'t simplify science. We clarify it. There\'s a huge difference between the two — and it changes everything.',
    gradient: 'from-quantum to-neuron'
  }, {
    name: 'Aarav Madan',
    role: 'Co-Founder: Director of Media & Creative Innovation Outreach',
    mission: 'To craft visual and narrative experiences that bring science to life—capturing wonder, curiosity, and design in every frame.',
    favoriteFields: ['⚙️', '💻', '🌍'],
    quote: 'Creativity is the science of seeing differently than your peers—then actually making it real.',
    gradient: 'from-neuron to-cosmic'
  }, {
    name: 'Ayush Srivastava',
    role: 'Co-Founder: Head Programmer & Lead Technical Coder',
    mission: 'To structure the backbone of the voices of tomorrow and facilitate the science of today.',
    favoriteFields: ['⚙️', '💻', '🧪'],
    quote: 'Good code is what makes a website clear and functional. Great code is what makes a website unforgettable.',
    gradient: 'from-cosmic to-quantum'
  }, {
    name: 'Kavin Puri',
    role: 'Co-Founder: Head Developer & Director of Content & Design',
    mission: 'To fuse elegant design with clear information & talented members and channel a universe of scientific innovation.',
    favoriteFields: ['🧬', '💻', '🩺'],
    quote: 'Every great team needs a great developer at its core to bring their vision to life & build towards the future of scientific collaboration.',
    gradient: 'from-molecule to-neuron'
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
    quote: 'STEM is the key to the future.',
    gradient: 'from-cosmic to-cosmic'    
  }];

  // subtle button gradients to vary per member (darker variants)
  const buttonGradients = [
    'linear-gradient(90deg,#052e24 0%,#064e3b 100%)',
    'linear-gradient(90deg,#2a0b3d 0%,#4c1d95 100%)',
    'linear-gradient(90deg,#003166 0%,#075985 100%)',
    'linear-gradient(90deg,#2e026d 0%,#5b21b6 100%)',
    'linear-gradient(90deg,#0b1f4b 0%,#321f7a 100%)',
  ];

  const buttonGradientMap: Record<string,string> = {
    Media: 'linear-gradient(90deg,#052e24 0%,#064e3b 100%)',
    Editing: 'linear-gradient(90deg,#2a0b3d 0%,#4c1d95 100%)',
    Outreach: 'linear-gradient(90deg,#002f8f 0%,#0047b3 100%)',
    Coding: 'linear-gradient(90deg,#2e026d 0%,#5b21b6 100%)'
  };

  const buttonBorderMap: Record<string,string> = {
    Media: 'rgba(6,78,59,0.9)',
    Editing: 'rgba(76,29,149,0.9)',
    Outreach: 'rgba(0,47,143,0.9)',
    Coding: 'rgba(46,2,109,0.9)'
  };

  const missionColorMap: Record<string,string> = {
    Media: '#bfeccf',
    Editing: '#e9d5ff',
    Outreach: '#bfdbfe',
    Coding: '#e9d5ff'
  };

  return <section className="py-20 px-4 bg-muted/30 font-sans" id="team">
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
                {/* Gradient overlay (darker) */}
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
        {/* Divisions (leads & members) */}
        <div className="mt-24">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-neuron to-cosmic bg-clip-text text-transparent">
            Team Divisions
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 text-center">Leads and members across our editorial and technical divisions. Click on any of the names of our Directors or writers below to view their published articles!</p>
          <div className="grid grid-cols-1 gap-20">
            {/** Division data inline for simplicity */}
            {[
              {
                title: 'Media',
                director: 'Aarav Madan',
                mission: 'Create engaging visual and multimedia content that brings scientific stories to life.',
                members: ['Anusha Gupta','Aashrith Rallabandi','Ishaan Sankaran','Mikul Jain','Bhawit Paudel','Mokshit Annavajhula','Sai Krishna Karthikeya Ramadugu','Sai Pranav Anantharamakrishnan','Riya Pawar','Shyamala Sree Sridhar'],
                gradient: 'from-molecule/90 to-quantum/100'
              },
              {
                title: 'Editing',
                director: 'Saanvi Palagani',
                mission: 'Refine and fact-check submissions to ensure clarity, accuracy, and editorial quality.',
                members: ['Bhawit Paudel','Ishani Aluguvelli','Shareen Tarigonda'],
                gradient: 'from-molecule/90 to-neuron/95'
              },
              {
                title: 'Outreach',
                director: ['Medhansh Garadala', 'Mihir Harinath'],
                mission: 'Build community connections and broaden our readership through partnerships and events.',
                members: ['Vedika Kamble'],
                gradient: 'from-quantum/90 to-molecule/95'
              },
              {
                title: 'Coding',
                director: ['Kavin Puri', 'Ayush Srivastava'],
                mission: 'Build and maintain the site\'s technical infrastructure to deliver fast, accessible science content.',
                members: ['Tavish Choudhari','Sharmin Tarigonda'],
                gradient: 'from-neuron/90 to-quantum/100'
              }
            ].map((div) => (
              <div key={div.title}>
                <div className="card-glow p-12 rounded-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl border border-gray-300/30 hover:border-primary min-h-[220px]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${div.gradient} opacity-55 group-hover:opacity-60 transition-opacity duration-500 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-black/86 group-hover:bg-black/92 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-row items-center justify-between gap-4 w-full text-base">
                    <div className="w-5/12 flex flex-col space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold text-white">{div.title}</h4>
                        <p className="text-xl text-white mt-2">Director: {Array.isArray(div.director) ? div.director.map((d:any, idx:number) => (
                          <span key={d}>
                            <button onClick={() => window.location.href = `#/articles?author=${encodeURIComponent(d)}`} className="inline text-xl font-extrabold text-white hover:opacity-90 transition-opacity mr-2">{d}</button>
                            {idx < (div.director as string[]).length - 1 ? <span className="text-white mr-2">&amp;</span> : null}
                          </span>
                        )) : (
                          <button onClick={() => window.location.href = `#/articles?author=${encodeURIComponent(div.director as string)}`} className="inline text-xl font-extrabold text-white hover:opacity-90 transition-opacity">{div.director}</button>
                        )}</p>
                      </div>
                      <div className="flex-1 flex items-center">
                        <p className="text-base mt-3" style={{ color: missionColorMap[div.title] ?? '#d1d5db' }}><span className="font-semibold">Mission:</span> {div.mission}</p>
                      </div>
                    </div>

                    <div className="w-7/12 pl-12">
                      <p className="text-base text-white mb-4 uppercase font-medium tracking-wide ml-1">Members:</p>
                      <div className="flex flex-wrap gap-3">
                        {div.members.map((m, i) => (
                          <button key={m} onClick={() => window.location.href = `#/articles?author=${encodeURIComponent(m)}`} className="group text-base px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:shadow-[0_10px_36px_rgba(124,58,237,0.18)] focus:outline-none" style={{ background: buttonGradientMap[div.title] ?? buttonGradients[i % buttonGradients.length], border: `1px solid ${buttonBorderMap[div.title] ?? 'rgba(55,0,95,0.6)'}` }}>
                            <span className="font-bold text-white transition-colors duration-200 group-hover:text-purple-300">{m}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-24">
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
                className="bg-purple-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
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
