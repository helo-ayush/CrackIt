import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Icon components matching homepage style
const IconSet = {
  Search: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  ),
  Users: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  ),
  Upload: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
    </svg>
  ),
  Award: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
    </svg>
  ),
  Rocket: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
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
};

// Animated section component with intersection observer
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
      default:
        return `${base} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`;
    }
  };

  return (
    <div ref={ref} className={getDirectionClasses()}>
      {children}
    </div>
  );
};

// Floating particles component
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
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

const HowItWorksPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const steps = [
    { 
      icon: <IconSet.Search />, 
      step: 1, 
      title: 'Discovery & Registration', 
      description: 'Explore a centralized hub of hackathons. Find the perfect challenge and sign up in a single click. Our user-friendly process makes registration and team creation a breeze.',
      gradient: 'from-purple-500 to-blue-600'
    },
    { 
      icon: <IconSet.Users />, 
      step: 2, 
      title: 'Project Development', 
      description: 'Collaborate with your team in a dedicated workspace. Utilize our AI Co-Pilot for brainstorming and ideation to bring your vision to life.',
      gradient: 'from-blue-500 to-pink-600'
    },
    { 
      icon: <IconSet.Upload />, 
      step: 3, 
      title: 'Secure Submission', 
      description: 'Upload your completed project, source code, and presentation files to our secure, centralized submission portal before the deadline hits.',
      gradient: 'from-pink-500 to-purple-600'
    },
    { 
      icon: <IconSet.Award />, 
      step: 4, 
      title: 'Evaluation & Results', 
      description: 'Judges use powerful, streamlined dashboards for scoring. View real-time results and analytics on our automated leaderboards to see who comes out on top.',
      gradient: 'from-pink-500 to-purple-600'
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        <FloatingParticles />
      </div>

      {/* Header */}
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
              <Link to="/features" className="relative group text-gray-300 hover:text-white transition-colors duration-300">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/how-it-works" className="relative group text-white transition-colors duration-300">
                How It Works
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></span>
              </Link>
              <Link to="/login" className="text-gray-300 font-medium hover:text-white transition-colors duration-300">
                Login
              </Link>
              <Link to="/signup" className="relative group bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2.5 px-6 rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10">Sign Up</span>
              </Link>
            </nav>

            <button 
              className="md:hidden text-white z-50 relative p-2 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors duration-300" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <IconSet.Close /> : <IconSet.Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-slate-900 to-purple-900 border-l border-white/10 transform transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 pt-20 space-y-6">
            <Link to="/features" className="block text-xl text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link to="/how-it-works" className="block text-xl text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>
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
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <AnimatedSection direction="scale">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 text-sm mb-8">
                <IconSet.Sparkles />
                <span className="ml-2 text-gray-200">Simple Process</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black leading-tight mb-6">
                <span className="block text-white">From Idea to Impact,</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                We've designed a seamless, end-to-end workflow that guides you through every stage of the hackathon journey. Here's how it works for participants and organizers alike.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Steps Timeline Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="relative max-w-5xl mx-auto">
              {/* Connection Line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500  to-green-500 transform -translate-x-1/2"></div>
              
              {steps.map((step, index) => (
                <div key={step.step} className="relative mb-24 last:mb-0">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    {index % 2 === 0 ? (
                      <>
                        <AnimatedSection direction="left" delay={index * 200}>
                          <div className="text-center lg:text-right lg:pr-16 mb-8 lg:mb-0">
                            <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                              <span className="w-6 h-6 bg-white text-purple-500 rounded-full flex items-center justify-center text-xs font-black mr-2">{step.step}</span>
                              STEP {step.step}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
                          </div>
                        </AnimatedSection>
                        <div className="hidden lg:block">
                          <div className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white shadow-2xl mx-auto relative z-10`}>
                            {step.icon}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:block order-first">
                          <div className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white shadow-2xl mx-auto relative z-10`}>
                            {step.icon}
                          </div>
                        </div>
                        <AnimatedSection direction="right" delay={index * 200}>
                          <div className="text-center lg:text-left lg:pl-16 mb-8 lg:mb-0">
                            <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                              <span className="w-6 h-6 bg-white text-blue-500 rounded-full flex items-center justify-center text-xs font-black mr-2">{step.step}</span>
                              STEP {step.step}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
                          </div>
                        </AnimatedSection>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <AnimatedSection direction="scale">
            <div className="container mx-auto px-6">
              <div className="relative text-center py-20 px-8 bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-2xl border border-white/20 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-sm mb-8">
                    <IconSet.Rocket />
                    <span className="ml-2 text-yellow-300 font-semibold">Ready to Begin</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Ready to Start Your
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      Innovation Journey?
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Find your next challenge or host your own breakthrough event on CrackIt.
                  </p>
                  
                  <Link to="/signup" className="group relative inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-10 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
                    <span className="flex items-center text-lg">
                      <IconSet.Rocket />
                      <span className="ml-2">Get Started Now</span>
                      <IconSet.ArrowRight />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                </div>
                
                <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-2xl border-t border-white/10 mt-12">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center">
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

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default HowItWorksPage;