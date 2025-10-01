// src/pages/FeaturesPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, Zap, Bot, LayoutDashboard, GitBranch, ArrowRight, Menu, X as CloseIcon } from 'lucide-react';

// Icon set for header consistency
const IconSet = {
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
};

// Enhanced AnimatedSection from HomePage
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


// Floating particles animation component from HomePage
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

// Restyled FeatureCard to match HomePage's aesthetic
const FeatureCard = ({ icon, title, description, gradient }) => (
    <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 h-full">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-500`}></div>
        <div className="relative z-10">
            <div className={`inline-block p-4 bg-gradient-to-br ${gradient} text-white rounded-2xl mb-6 shadow-2xl`}>
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
    </div>
);

const FeaturesPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isMenuOpen]);

    const coreFeatures = [
        { icon: <Zap className="w-8 h-8" />, title: 'Unified Platform', description: 'Manage the entire hackathon lifecycle from a single, intuitive dashboard. From registration and team formation to project submission and final results.', gradient: 'from-blue-500 to-purple-600' },
        { icon: <LayoutDashboard className="w-8 h-8" />, title: 'Role-Based Dashboards', description: 'Custom-tailored views for organizers, participants, judges, and mentors, ensuring everyone has the tools they need to succeed.', gradient: 'from-purple-500 to-pink-600' },
        { icon: <Users className="w-8 h-8" />, title: 'Seamless Teaming', description: 'Participants can easily create teams, invite members, or use our AI Assistant to find teammates with complementary skills.', gradient: 'from-pink-500 to-red-600' },
        { icon: <ShieldCheck className="w-8 h-8" />, title: 'Secure & Centralized Submissions', description: 'A dedicated workspace for teams to securely upload their projects, code, presentations, and video demos.', gradient: 'from-green-500 to-teal-600' },
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden relative">
            {/* Enhanced Background Effects from HomePage */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-50">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
                </div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
                <FloatingParticles />
            </div>

            {/* Enhanced Header from HomePage */}
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
                        <Link to="/" className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                CrackIt
                            </span>
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full inline-block ml-1 animate-pulse"></div>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link to="/features" className="relative group text-white font-semibold transition-colors duration-300">
                                Features
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></span>
                            </Link>
                            <Link to="/how-it-works" className="relative group text-gray-300 hover:text-white transition-colors duration-300">
                                How It Works
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link to="/login" className="text-gray-300 font-medium hover:text-white transition-colors duration-300">Login</Link>
                            <Link to="/signup" className="relative group bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2.5 px-6 rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                                <span className="relative z-10">Sign Up</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        </nav>
                        <button className="md:hidden text-white z-50 relative p-2 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <IconSet.Close /> : <IconSet.Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Enhanced Mobile Menu from HomePage */}
            <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" onClick={() => setIsMenuOpen(false)}></div>
                <div className={`absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-slate-900 to-purple-900 border-l border-white/10 transform transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-8 pt-20 space-y-6">
                        <Link to="/features" className="block text-xl text-white font-semibold py-3 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>Features</Link>
                        <Link to="/how-it-works" className="block text-xl text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
                        <Link to="/login" className="block text-xl text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>Login</Link>
                        <Link to="/signup" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl text-center text-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-8" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                    </div>
                </div>
            </div>

            <main className="pt-24 md:pt-32">
                <AnimatedSection>
                    <section className="text-center container mx-auto px-6 py-16">
                        <h1 className="text-4xl md:text-6xl font-black text-white">A Feature Set Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Success</span></h1>
                        <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            CrackIt is engineered to eliminate friction and amplify creativity. Explore the tools that make our platform the ultimate hackathon ecosystem.
                        </p>
                    </section>
                </AnimatedSection>

                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {coreFeatures.map((feature, index) => (
                                <AnimatedSection key={feature.title} delay={index * 150}>
                                    <FeatureCard {...feature} />
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                <AnimatedSection>
                    <section className="py-20 bg-black/20 backdrop-blur-lg">
                        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                            <div className="pr-8">
                                <div className="inline-flex items-center bg-purple-500/20 text-purple-300 font-semibold px-4 py-1 rounded-full mb-4">
                                    <Bot className="w-5 h-5 mr-2" /> AI-Powered
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Enhance Every Stage with AI</h2>
                                <p className="text-gray-300 mb-6">
                                    Our integrated AI tools are designed to streamline processes and foster innovation, providing intelligent assistance from team formation to final judging.
                                </p>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex items-start"><GitBranch className="w-6 h-6 mr-3 text-purple-400 flex-shrink-0 mt-1" /><span><span className="font-semibold text-white">AI Team Formation:</span> Intelligently matches participants based on skills and interests.</span></li>
                                    <li className="flex items-start"><Bot className="w-6 h-6 mr-3 text-purple-400 flex-shrink-0 mt-1" /><span><span className="font-semibold text-white">AI Idea Co-Pilot:</span> Assists teams with brainstorming and refining their project ideas.</span></li>
                                    <li className="flex items-start"><LayoutDashboard className="w-6 h-6 mr-3 text-purple-400 flex-shrink-0 mt-1" /><span><span className="font-semibold text-white">AI Submission Summarizer:</span> Automatically generates project summaries to streamline the judging process.</span></li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-3xl shadow-2xl text-white transform transition-all duration-500 hover:shadow-purple-500/50 hover:scale-105">
                                <h3 className="text-2xl font-bold mb-4">See AI in Action</h3>
                                <p className="text-purple-100 mb-6">Imagine a world where finding the perfect teammate is effortless and judges can grasp the core of a complex project in seconds. That's the power of CrackIt's AI.</p>
                                <Link to="/signup" className="group inline-flex items-center justify-center bg-white text-purple-600 font-semibold py-3 px-6 rounded-xl hover:scale-105 transition-transform duration-300">
                                    Experience It Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            </main>

            {/* Enhanced Footer from HomePage */}
            <footer className="bg-black/20 backdrop-blur-2xl border-t border-white/10 mt-12">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center">
                        <div className="md:text-left">
                            <Link to="/" className="inline-flex items-center text-3xl font-bold">
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">CrackIt</span>
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full ml-2 animate-pulse"></div>
                            </Link>
                            <p className="text-gray-400 text-sm mt-2 max-w-xs">Powering the next generation of innovation through intelligent hackathon experiences.</p>
                        </div>
                        <div className="flex justify-center space-x-8">
                            <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">About<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span></Link>
                            <Link to="/careers" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">Careers<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span></Link>
                            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">Contact<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span></Link>
                        </div>
                        <div className="md:text-right">
                            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} CrackIt. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FeaturesPage;
