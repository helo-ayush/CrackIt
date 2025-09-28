import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles,
  Clock,
  Globe,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

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
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
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

// Enhanced FAQ item component
const FaqItem = ({ question, answer, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`${!isLast ? 'border-b border-white/10' : ''} py-4`}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left group"
      >
        <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
          {question}
        </h3>
        <ChevronDown className={`w-5 h-5 text-purple-400 transform transition-all duration-300 ${isOpen ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="pt-4 text-gray-300 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Replace with your actual form submission logic
    if (formData.name && formData.email && formData.message) {
      console.log("Form Submitted:", formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  const faqs = [
    { 
      question: "How do I register for a hackathon?", 
      answer: "Browse active hackathons on our platform, click on one that interests you, and follow the simple registration process." 
    },
    { 
      question: "Can I join a team after registering?", 
      answer: "Absolutely! Use our smart team-matching feature or create your own team from your participant dashboard." 
    },
    { 
      question: "What are the submission requirements?", 
      answer: "Requirements vary by event. Check each hackathon's detailed rules and judging criteria page for specific guidelines." 
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "hello@crackit.com",
      href: "mailto:hello@crackit.com",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: "Response Time",
      value: "Within 24 hours",
      gradient: "from-green-500 to-blue-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Support Hours",
      value: "24/7 Online",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden relative">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
        
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
        <section className="container mx-auto px-6 py-16 relative">
          <AnimatedSection direction="scale">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-sm mb-6">
                <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                <span className="text-purple-300 font-semibold">Get In Touch</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                <span className="text-white">Let's</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"> Connect</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Have a question or feedback? We'd love to hear from you. Our team is here to help make your innovation journey seamless.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Main Content Section */}
        <section className="pb-20">
          <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-12 max-w-7xl">
            {/* Contact Form */}
            <AnimatedSection direction="left" className="lg:col-span-2">
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mr-4">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white">Send Us a Message</span>
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          className="w-full p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                          placeholder="Enter your full name"
                          required 
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          className="w-full p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                          placeholder="your@email.com"
                          required 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea 
                        id="message" 
                        rows="6" 
                        value={formData.message} 
                        onChange={handleChange} 
                        className="w-full p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none" 
                        placeholder="Tell us how we can help you..."
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={status === 'sending'} 
                      className="group relative w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center">
                        {status === 'sending' ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </button>
                    
                    {status === 'success' && (
                      <div className="flex items-center justify-center bg-green-500/20 border border-green-500/30 text-green-300 p-4 rounded-2xl">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Message sent successfully! We'll get back to you soon.
                      </div>
                    )}
                    
                    {status === 'error' && (
                      <div className="flex items-center justify-center bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-2xl">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Please fill out all fields correctly.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Info & FAQs */}
            <div className="space-y-8">
              {/* Contact Information */}
              <AnimatedSection direction="right" delay={200}>
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center group">
                        <div className={`p-3 bg-gradient-to-br ${info.gradient} rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{info.label}</p>
                          {info.href ? (
                            <a href={info.href} className="text-white font-medium hover:text-purple-300 transition-colors duration-300">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-white font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* FAQs */}
              <AnimatedSection direction="right" delay={400}>
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Quick Answers</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, index) => (
                      <FaqItem 
                        key={faq.question} 
                        question={faq.question} 
                        answer={faq.answer}
                        isLast={index === faqs.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
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
                Always here to support your innovation journey.
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
                We're here to help, 24/7
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
