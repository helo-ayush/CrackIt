import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Enhanced IconSet with more modern icons and effects
const IconSet = {
  ArrowRight: () => (
    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
    </svg>
  ),
  Discover: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  ),
  TeamUp: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  ),
  Submit: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
    </svg>
  ),
  Evaluate: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  ),
  Lightning: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
  ),
  Rocket: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
    </svg>
  ),
};

// Enhanced AnimatedSection with more dynamic animations
const AnimatedSection = ({ children, direction = 'up', delay = 0 }) => {
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
    <div ref={ref} className={getDirectionClasses()}>
      {children}
    </div>
  );
};

// Floating particles animation component
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
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
          className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Stats component for impact numbers
const StatsSection = () => {
  const [counters, setCounters] = useState({
    hackathons: 0,
    participants: 0,
    projects: 0,
    prizes: 0,
  });

  const targetValues = {
    hackathons: 500,
    participants: 50000,
    projects: 15000,
    prizes: 2500000,
  };

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(targetValues).forEach((key) => {
        let currentStep = 0;
        const increment = targetValues[key] / steps;

        const timer = setInterval(() => {
          currentStep++;
          setCounters((prev) => ({
            ...prev,
            [key]: Math.min(Math.floor(increment * currentStep), targetValues[key]),
          }));

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    }
  }, [isVisible]);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {counters.hackathons}+
        </div>
        <div className="text-gray-300 text-sm uppercase tracking-wider">Hackathons Hosted</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {formatNumber(counters.participants)}+
        </div>
        <div className="text-gray-300 text-sm uppercase tracking-wider">Active Participants</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
          {formatNumber(counters.projects)}+
        </div>
        <div className="text-gray-300 text-sm uppercase tracking-wider">Projects Built</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
          ${formatNumber(counters.prizes)}+
        </div>
        <div className="text-gray-300 text-sm uppercase tracking-wider">Prize Money</div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const features = [
    { 
      icon: <IconSet.Discover />, 
      title: 'Hackathon Discovery', 
      description: 'Explore a central hub of challenges tailored to your interests with AI-powered recommendations.',
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      icon: <IconSet.TeamUp />, 
      title: 'Smart Team Formation', 
      description: 'Advanced matching algorithms connect you with complementary skills and shared vision.',
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      icon: <IconSet.Submit />, 
      title: 'Secure Cloud Workspace', 
      description: 'Enterprise-grade security with real-time collaboration tools and version control.',
      gradient: 'from-pink-500 to-red-600'
    },
    { 
      icon: <IconSet.Evaluate />, 
      title: 'AI-Powered Judging', 
      description: 'Intelligent evaluation system with bias detection and comprehensive analytics.',
      gradient: 'from-green-500 to-teal-600'
    },
  ];

  // Enhanced states
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const wordsToType = ["Innovation", "Collaboration", "Creation", "Revolution"];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Typing animation
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = wordsToType[wordIndex];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);
      setText(updatedText);
      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % wordsToType.length);
      }
    };
    const typingSpeed = isDeleting ? 80 : 150;
    const timeoutId = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex]);

  // Enhanced mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Enhanced parallax calculations
  const xOffset = (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 400)) / (typeof window !== 'undefined' ? window.innerWidth / 2 : 400);
  const yOffset = (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 400)) / (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden relative">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        
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
              <Link to="/features" className="relative group text-gray-300 hover:text-white transition-colors duration-300">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/how-it-works" className="relative group text-gray-300 hover:text-white transition-colors duration-300">
                How It Works
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
              {isMenuOpen ? <IconSet.Close /> : <IconSet.Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-slate-900 to-purple-900 border-l border-white/10 transform transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 pt-20 space-y-6">
            <Link to="/features" className="block text-xl text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link to="/how-it-works" className="block text-xl text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>
              How It Works
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

      {/* Main Content */}
      <main className="pt-24">
        {/* Enhanced Hero Section */}
        <section className="container mx-auto px-6 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
            <div className="text-center lg:text-left z-10 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 text-sm">
                  <IconSet.Sparkles />
                  <span className="ml-2 text-gray-200">The Future of Hackathons is Here</span>
                </div>
                
                <h1 className="text-4xl md:text-7xl font-black leading-tight">
                  <span className="block text-white">The Ultimate</span>
                  <span className="block text-white">Platform for</span>
                  <div className="relative">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent min-h-[1.2em] inline-block">
                      {text || '\u00A0'}
                    </span>
                    <span className="text-purple-400 animate-pulse ml-1">|</span>
                  </div>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience the next generation of hackathon hosting with AI-powered matching, real-time collaboration, and enterprise-grade security. Transform ideas into reality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/hackathons" className="group relative inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <span className="flex items-center">
                    <IconSet.Rocket />
                    <span className="ml-2">Explore Hackathons</span>
                    <IconSet.ArrowRight />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
                
                <button className="group relative inline-flex items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
                  <IconSet.Lightning />
                  <span className="ml-2">Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Enhanced 3D Visualization */}
            <div className="relative h-96 lg:h-[600px]">
              <div className="absolute w-full h-full perspective-1000">
                <div 
                  className="relative w-full h-full transform-gpu transition-all duration-300 ease-out preserve-3d"
                  style={{ 
                    transform: `translateX(${xOffset * -5}px) translateY(${yOffset * -5}px) rotateX(${yOffset * 10}deg) rotateY(${xOffset * 10}deg)`
                  }}
                >
                  {/* Floating Cards with Enhanced Animations */}
                  <div className="absolute top-8 left-8 w-64 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 transform rotate-6 hover:rotate-12 transition-all duration-500 animate-float">
                    <div className="w-12 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <div className="w-20 h-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mt-3 opacity-70"></div>
                    <div className="w-16 h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mt-2 opacity-50"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60"></div>
                  </div>
                  
                  <div className="absolute top-20 right-4 w-72 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 transform -rotate-3 hover:-rotate-6 transition-all duration-500 animate-float-delayed">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <div className="space-y-3">
                      <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      <div className="w-4/5 h-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-70"></div>
                      <div className="w-3/5 h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-50"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-12 left-20 w-56 h-36 bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 transform rotate-12 hover:rotate-[18deg] transition-all duration-500 animate-float-slow">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg mb-3"></div>
                    <div className="space-y-2">
                      <div className="w-full h-1.5 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
                      <div className="w-3/4 h-1.5 bg-gradient-to-r from-green-300 to-teal-300 rounded-full opacity-70"></div>
                      <div className="w-1/2 h-1.5 bg-gradient-to-r from-green-200 to-teal-200 rounded-full opacity-50"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 right-12 w-48 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 transform -rotate-6 hover:-rotate-12 transition-all duration-500 animate-float-fast">
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full"></div>
                      <div className="text-xs text-yellow-200 font-bold">LIVE</div>
                    </div>
                    <div className="space-y-1">
                      <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                      <div className="w-2/3 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-70"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-xl border-y border-white/10">
          <div className="container mx-auto px-6">
            <AnimatedSection direction="scale">
              <div className="text-center mb-12">
                <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-widest mb-4">
                  Trusted by Innovation Leaders Worldwide
                </h3>
              </div>
              <StatsSection />
            </AnimatedSection>
          </div>
        </section>

        {/* Enhanced Trusted By Section */}
        <section className="py-16">
          <AnimatedSection>
            <div className="container mx-auto px-6 text-center">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
                Powering Innovation at
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
                {['InnovateCorp', 'QuantumLeap U', 'CodeFoundry', 'NextGen Ventures', 'DevSphere'].map((company, index) => (
                  <div key={company} className="relative group">
                    <span className="font-bold text-2xl text-gray-300 group-hover:text-white transition-colors duration-300">
                      {company}
                    </span>
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="py-24 bg-gradient-to-b from-slate-900/50 to-purple-900/20">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-20">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-2 text-sm mb-6">
                  <IconSet.Sparkles />
                  <span className="ml-2 text-purple-300">Next-Generation Features</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Everything You Need,
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Reimagined
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Revolutionary tools powered by AI and machine learning to create the most seamless hackathon experience ever built.
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <AnimatedSection key={feature.title} delay={index * 200}>
                  <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`inline-block p-4 bg-gradient-to-br ${feature.gradient} text-white rounded-2xl mb-6 shadow-2xl`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-10 rounded-3xl`}></div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced How It Works Section */}
        <section id="how-it-works" className="py-24">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-20">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-2 text-sm mb-6">
                  <IconSet.Rocket />
                  <span className="ml-2 text-blue-300">Simple Process</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Launch in 
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> 3 Steps</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  From concept to execution in minutes. Our streamlined process eliminates complexity while maximizing innovation potential.
                </p>
              </div>
            </AnimatedSection>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Connection Line */}
              <div className="hidden lg:block absolute left-1/2 top-16 bottom-16 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 transform -translate-x-1/2"></div>
              
              {/* Step 1 */}
              <div className="relative mb-16 lg:mb-24">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <AnimatedSection direction="left">
                    <div className="text-center lg:text-right lg:pr-16">
                      <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                        <span className="w-6 h-6 bg-white text-purple-500 rounded-full flex items-center justify-center text-xs font-black mr-2">1</span>
                        CREATE & CUSTOMIZE
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Design Your Vision
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        Use our intuitive builder with AI-powered templates to craft compelling challenges. Set themes, rules, prizes, and judging criteria with enterprise-grade customization.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">AI Templates</span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Smart Rules</span>
                        <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">Custom Branding</span>
                      </div>
                    </div>
                  </AnimatedSection>
                  <div className="hidden lg:block">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-2xl mx-auto relative z-10">
                      1
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative mb-16 lg:mb-24">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="hidden lg:block order-first">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-2xl mx-auto relative z-10">
                      2
                    </div>
                  </div>
                  <AnimatedSection direction="right">
                    <div className="text-center lg:text-left lg:pl-16">
                      <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                        <span className="w-6 h-6 bg-white text-blue-500 rounded-full flex items-center justify-center text-xs font-black mr-2">2</span>
                        ENGAGE & COLLABORATE
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Smart Connections
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        AI-powered participant matching creates optimal teams based on skills, interests, and goals. Real-time collaboration tools keep everyone synchronized and motivated.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Smart Matching</span>
                        <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">Live Chat</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Video Calls</span>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <AnimatedSection direction="left">
                    <div className="text-center lg:text-right lg:pr-16">
                      <div className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                        <span className="w-6 h-6 bg-white text-pink-500 rounded-full flex items-center justify-center text-xs font-black mr-2">3</span>
                        EVALUATE & CELEBRATE
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Intelligent Assessment
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        Advanced judging dashboards with bias detection ensure fair evaluation. Automated leaderboards and instant winner announcements create memorable closing experiences.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                        <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">AI Judging</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Auto Rankings</span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Live Results</span>
                      </div>
                    </div>
                  </AnimatedSection>
                  <div className="hidden lg:block">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-2xl mx-auto relative z-10">
                      3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Final CTA Section */}
        <section className="py-24">
          <AnimatedSection direction="scale">
            <div className="container mx-auto px-6">
              <div className="relative text-center py-20 px-8 bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-2xl border border-white/20 rounded-[3rem] overflow-hidden shadow-2xl">
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-sm mb-8">
                    <IconSet.Lightning />
                    <span className="ml-2 text-yellow-300 font-semibold">Join the Revolution</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Ready to Start Your
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      Innovation Journey?
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Join thousands of visionaries, developers, and entrepreneurs who are shaping the future through groundbreaking hackathons.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link to="/signup" className="group relative inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-10 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
                      <span className="flex items-center text-lg">
                        <IconSet.Rocket />
                        <span className="ml-2">Start Free Today</span>
                        <IconSet.ArrowRight />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </Link>
                    
                    <div className="text-gray-300 text-sm">
                      <div className="flex items-center justify-center space-x-4">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          No Credit Card
                        </span>
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                          30-Day Trial
                        </span>
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                          Cancel Anytime
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
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
                Powering the next generation of innovation through intelligent hackathon experiences.
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

export default HomePage;
