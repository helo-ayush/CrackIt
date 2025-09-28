import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Code, 
  Palette, 
  Zap, 
  Users, 
  Coffee, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles,
  Rocket,
  Heart,
  Globe,
  TrendingUp,
  Shield,
  Star,
  ArrowRight
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
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
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

// Enhanced Job Opening Component
const JobOpening = ({ job, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatedSection delay={index * 150}>
      <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl transition-all duration-500 overflow-hidden hover:bg-white/10 hover:-translate-y-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-8 flex flex-col md:flex-row justify-between items-start md:items-center text-left"
        >
          <div className="flex items-center">
            <div className={`p-4 bg-gradient-to-br ${job.gradient} text-white rounded-2xl mr-6 shadow-2xl`}>
              {job.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  <Globe className="w-4 h-4 inline mr-1" />
                  {job.location}
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  {job.type}
                </span>
                {job.salary && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    {job.salary}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center text-purple-400 font-semibold mt-6 md:mt-0 group-hover:text-pink-400 transition-colors duration-300">
            <span className="mr-2">View Details</span>
            <ChevronDown className={`w-5 h-5 transform transition-all duration-300 ${isOpen ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
          </div>
        </button>

        {/* Collapsible content */}
        <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-8 pb-8 border-t border-white/10">
            <div className="pt-6 space-y-6">
              <div>
                <h4 className="font-bold text-white text-lg mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
              
              {job.requirements && (
                <div>
                  <h4 className="font-bold text-white text-lg mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-400" />
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center">
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Hover glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${job.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500 pointer-events-none`}></div>
      </div>
    </AnimatedSection>
  );
};

const CareersPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const whyWorkWithUs = [
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: 'High Impact', 
      description: 'Work on a product that directly empowers innovators and creators worldwide.',
      gradient: 'from-yellow-500 to-orange-600'
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: 'Collaborative Culture', 
      description: 'Join a passionate team where your voice is heard and your ideas matter.',
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      icon: <Coffee className="w-8 h-8" />, 
      title: 'Flexibility & Growth', 
      description: 'We offer remote work options and opportunities for professional development.',
      gradient: 'from-green-500 to-teal-600'
    },
    { 
      icon: <Heart className="w-8 h-8" />, 
      title: 'Work-Life Balance', 
      description: 'Competitive benefits, flexible hours, and a supportive environment.',
      gradient: 'from-pink-500 to-red-600'
    }
  ];

  const jobOpenings = [
    { 
      icon: <Code className="w-8 h-8" />, 
      title: 'Senior Frontend Developer', 
      location: 'Remote', 
      type: 'Full-time',
      salary: '$80k - $120k',
      gradient: 'from-blue-500 to-purple-600',
      responsibilities: [
        'Develop cutting-edge user interfaces using React.js and modern frameworks',
        'Build reusable component libraries and design systems',
        'Optimize applications for maximum speed and scalability',
        'Collaborate with designers to implement pixel-perfect designs',
        'Mentor junior developers and contribute to technical decisions'
      ],
      requirements: [
        '5+ years of experience with React.js and TypeScript',
        'Strong understanding of modern CSS and styling frameworks',
        'Experience with state management (Redux, Zustand)',
        'Knowledge of testing frameworks (Jest, Cypress)',
        'Excellent problem-solving and communication skills'
      ]
    },
    { 
      icon: <Briefcase className="w-8 h-8" />, 
      title: 'Backend Engineer (Node.js)', 
      location: 'Remote', 
      type: 'Full-time',
      salary: '$75k - $110k',
      gradient: 'from-green-500 to-blue-600',
      responsibilities: [
        'Design and implement scalable RESTful APIs and GraphQL endpoints',
        'Manage database schemas, migrations, and performance optimization',
        'Ensure security, scalability, and performance of backend systems',
        'Integrate third-party services and payment processing',
        'Implement monitoring, logging, and error tracking systems'
      ],
      requirements: [
        '4+ years of experience with Node.js and Express.js',
        'Strong knowledge of databases (PostgreSQL, MongoDB)',
        'Experience with cloud platforms (AWS, GCP, Azure)',
        'Understanding of microservices architecture',
        'Experience with containerization (Docker, Kubernetes)'
      ]
    },
    { 
      icon: <Palette className="w-8 h-8" />, 
      title: 'Senior UI/UX Designer', 
      location: 'Remote', 
      type: 'Contract',
      salary: '$60k - $90k',
      gradient: 'from-pink-500 to-purple-600',
      responsibilities: [
        'Create innovative wireframes, prototypes, and user flows',
        'Design intuitive and visually stunning user interfaces',
        'Conduct user research and analyze feedback for improvements',
        'Collaborate with developers to ensure design feasibility',
        'Maintain and evolve our design system and brand guidelines'
      ],
      requirements: [
        '4+ years of UI/UX design experience',
        'Proficiency in Figma, Sketch, or Adobe Creative Suite',
        'Strong portfolio demonstrating modern design principles',
        'Experience with design systems and component libraries',
        'Understanding of frontend development constraints'
      ]
    },
    { 
      icon: <Rocket className="w-8 h-8" />, 
      title: 'DevOps Engineer', 
      location: 'Remote', 
      type: 'Full-time',
      salary: '$85k - $125k',
      gradient: 'from-purple-500 to-pink-600',
      responsibilities: [
        'Build and maintain CI/CD pipelines for seamless deployments',
        'Manage cloud infrastructure and monitoring systems',
        'Implement security best practices and compliance measures',
        'Automate deployment processes and system maintenance',
        'Optimize performance and cost efficiency of cloud resources'
      ],
      requirements: [
        '3+ years of DevOps experience with cloud platforms',
        'Strong knowledge of Docker, Kubernetes, and Terraform',
        'Experience with monitoring tools (Datadog, New Relic)',
        'Understanding of security best practices',
        'Scripting experience with Python, Bash, or Go'
      ]
    }
  ];

  const perks = [
    { icon: <Globe className="w-6 h-6" />, text: 'Work from anywhere' },
    { icon: <Heart className="w-6 h-6" />, text: 'Health & wellness benefits' },
    { icon: <TrendingUp className="w-6 h-6" />, text: 'Stock options & equity' },
    { icon: <Coffee className="w-6 h-6" />, text: 'Unlimited PTO' },
    { icon: <Rocket className="w-6 h-6" />, text: 'Learning & development budget' },
    { icon: <Users className="w-6 h-6" />, text: 'Team retreats & events' }
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
                <span className="text-purple-300 font-semibold">Join Our Mission</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black leading-tight">
                <span className="block text-white">Shape the Future</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  With Us
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We're a small team with a big mission. Join passionate, creative individuals building the ultimate platform for innovators and revolutionizing how the world collaborates.
              </p>
              
              {/* Perks preview */}
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                {perks.slice(0, 3).map((perk, index) => (
                  <div key={index} className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 text-sm">
                    {perk.icon}
                    <span className="ml-2 text-gray-300">{perk.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Enhanced Why Work With Us Section */}
        <section className="py-24 bg-gradient-to-b from-slate-900/50 to-purple-900/20">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-20">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-sm mb-8">
                  <Heart className="w-5 h-5 mr-2 text-pink-400" />
                  <span className="text-pink-300 font-semibold">Why Choose CrackIt</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Why Join Our
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"> Team?</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  More than just a job - join a movement that's reshaping how innovation happens globally.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {whyWorkWithUs.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 200}>
                  <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2">
                    <div className={`inline-block p-4 bg-gradient-to-br ${item.gradient} text-white rounded-2xl mb-6 shadow-2xl`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {item.description}
                    </p>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Open Positions */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-20">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-sm mb-8">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="text-blue-300 font-semibold">Open Positions</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Current
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Openings</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Ready to make an impact? Explore our open positions and find your perfect role in shaping the future of innovation.
                </p>
              </div>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto space-y-8">
              {jobOpenings.map((job, index) => (
                <JobOpening key={job.title} job={job} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Perks Section */}
        <section className="py-24 bg-gradient-to-b from-purple-900/20 to-slate-900/50">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Amazing
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Perks & Benefits</span>
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  We believe in taking care of our team with comprehensive benefits and perks.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {perks.map((perk, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="group flex items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mr-4 text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                      {perk.icon}
                    </div>
                    <span className="text-white font-medium">{perk.text}</span>
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
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Don't See Your Role?
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      Let's Talk Anyway
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
                    We're always looking for exceptional talent. Even if you don't see the perfect role listed, we'd love to hear from you and explore how you can contribute to our mission.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button className="group relative inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-10 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
                      <span className="flex items-center text-lg">
                        <Heart className="w-6 h-6 mr-2" />
                        <span>Send Us Your Resume</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </button>
                    
                    <button className="group relative inline-flex items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
                      <Users className="w-6 h-6 mr-2" />
                      <span>Learn About Our Culture</span>
                    </button>
                  </div>
                  
                  <div className="mt-8 text-gray-300 text-sm">
                    <div className="flex items-center justify-center space-x-6">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        Equal Opportunity Employer
                      </span>
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                        Remote-First Culture
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
                Building the future of hackathons, one innovation at a time.
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
                Join us in revolutionizing innovation
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;
