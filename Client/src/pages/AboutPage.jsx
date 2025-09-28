import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Users, ShieldCheck, Target, Rocket, Briefcase, GitBranch, ArrowRight, Sparkles, Zap, Menu, X } from 'lucide-react';

// Enhanced AnimatedSection with intersection observer
const AnimatedSection = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  const getDirectionClasses = () => {
    const base = 'transition-all duration-1000 ease-out transform';
    switch (direction) {
      case 'left':
        return `${base} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`;
      case 'right':
        return `${base} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`;
      case 'scale':
        return `${base} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
      default: // 'up'
        return `${base} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`;
    }
  };

  return (
    <div ref={ref} className={`${getDirectionClasses()} ${className}`}>
      {children}
    </div>
  );
};

// Floating particles animation component
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const AboutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const futureScopes = [
    { 
      icon: <Rocket className="w-8 h-8 text-white" />, 
      title: 'Project Incubation', 
      description: 'Offer resources and mentorship to help the best projects grow into startups after the event.',
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      icon: <Briefcase className="w-8 h-8 text-white" />, 
      title: '"Hack-to-Hire" Pipeline', 
      description: 'Directly connect top participants with recruiters and job opportunities from sponsors.',
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      icon: <GitBranch className="w-8 h-8 text-white" />, 
      title: 'Smarter AI Co-Pilot', 
      description: 'Evolve from brainstorming to offering real-time code suggestions and debugging help.',
      gradient: 'from-green-500 to-blue-600'
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'We believe every great idea deserves the best platform to flourish.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Driven',
      description: 'Building connections and fostering collaboration across the global tech community.',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Security & Trust',
      description: 'Enterprise-grade security ensuring your ideas and code are always protected.',
      gradient: 'from-green-400 to-teal-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Results Focused',
      description: 'Every feature is designed to maximize innovation outcomes and participant success.',
      gradient: 'from-red-400 to-pink-500'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden relative">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
        
        <FloatingParticles />
      </div>

      {/* Enhanced Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
            <Link to="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                CrackIt
              </span>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full inline-block ml-1 animate-pulse"></div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/#features" className="relative group text-gray-300 hover:text-white transition-colors duration-300">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/login" className="text-gray-300 font-medium hover:text-white transition-colors duration-300">
                Login
              </Link>
              <Link to="/signup" className="relative group bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2.5 px-6 rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white z-50 relative p-2 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors duration-300" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-slate-900 to-purple-900 border-l border-white/10 transform transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 pt-20 space-y-6">
            <Link to="/#features" className="block text-xl text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link to="/login" className="block text-xl text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl text-center text-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-8" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <main className="pt-24">
        {/* Enhanced Hero Section */}
        <section className="container mx-auto px-6 py-20 relative">
          <AnimatedSection direction="scale">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-sm mb-8">
                <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                <span className="text-purple-300 font-semibold">Our Story</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black leading-tight">
                <span className="block text-white">We're Building the</span>
                <span className="block text-white">Future of</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Innovation
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                CrackIt was born from a simple observation: hackathons are essential for discovering talent, but the tools to manage them are often cluttered and impersonal. We're here to revolutionize that experience.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Enhanced Problem & Solution Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* The Problem */}
              <AnimatedSection direction="left">
                <div className="relative bg-gradient-to-br from-red-900/20 to-pink-900/20 backdrop-blur-2xl border border-red-500/20 rounded-3xl p-8 overflow-hidden">
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-16">
                    <h2 className="text-3xl font-bold text-white mb-6">The Problem</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Existing hackathon platforms often lack personalization and create fragmented experiences. This results in a disconnected ecosystem for organizers, participants, and judges alike. We knew there had to be a better way.
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
                </div>
              </AnimatedSection>

              {/* The Solution */}
              <AnimatedSection direction="right">
                <div className="relative bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-2xl border border-green-500/20 rounded-3xl p-8 overflow-hidden">
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Our Solution</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      CrackIt is a unified, intuitive, and scalable platform designed to manage innovation challenges seamlessly. We provide an end-to-end solution with AI-driven tools, role-based dashboards, and secure submission workspaces.
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-2xl"></div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gradient-to-b from-slate-900/50 to-purple-900/20">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-20">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-sm mb-8">
                  <ShieldCheck className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="text-blue-300 font-semibold">Our Values</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  What Drives Us
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Our core values shape every decision and drive us to create the most innovative hackathon platform possible.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <AnimatedSection key={value.title} delay={index * 200}>
                  <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2">
                    <div className={`inline-block p-4 bg-gradient-to-br ${value.gradient} text-white rounded-2xl mb-6 shadow-2xl`}>
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                    <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Vision Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-20">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-sm mb-8">
                  <Rocket className="w-5 h-5 mr-2 text-purple-400" />
                  <span className="text-purple-300 font-semibold">Future Vision</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Our Vision for the
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"> Future</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  We're not just a platform; we're a launchpad for careers and companies that will shape tomorrow's world.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {futureScopes.map((scope, index) => (
                <AnimatedSection key={scope.title} delay={index * 200}>
                  <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 h-full">
                    <div className={`absolute inset-0 bg-gradient-to-r ${scope.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`inline-block p-4 bg-gradient-to-br ${scope.gradient} text-white rounded-2xl mb-6 shadow-2xl`}>
                        {scope.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {scope.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {scope.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="py-24">
          <AnimatedSection direction="scale">
            <div className="container mx-auto px-6">
              <div className="relative text-center py-20 px-8 bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-2xl border border-white/20 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-sm mb-8">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                    <span className="text-yellow-300 font-semibold">Join the Revolution</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Ready to Join the
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      Movement?
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Whether you're hosting an event or looking for your next challenge, CrackIt is designed to amplify your innovation journey.
                  </p>
                  
                  <Link to="/signup" className="group relative inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-10 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
                    <span className="flex items-center text-lg">
                      <Rocket className="w-6 h-6 mr-2" />
                      <span>Get Started for Free</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                  
                  <div className="mt-6 text-gray-300 text-sm">
                    <div className="flex items-center justify-center space-x-4">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        No Credit Card Required
                      </span>
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                        Instant Setup
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-bounce"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-bounce" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-black/20 backdrop-blur-2xl border-t border-white/10 mt-12">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center">
            {/* Logo Column */}
            <div className="md:text-left">
              <Link to="/" className="inline-flex items-center text-3xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  CrackIt
                </span>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full ml-2 animate-pulse"></div>
              </Link>
              <p className="text-gray-400 text-sm mt-2 max-w-xs">
                Revolutionizing hackathons through intelligent design and seamless experiences.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex justify-center space-x-8">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/careers" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
                Careers
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Copyright */}
            <div className="md:text-right">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} CrackIt. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Built with ❤️ for innovators worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
