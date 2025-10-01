import { Eye, EyeOff, User, Mail, KeyRound } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Reusable AnimatedSection for consistent entry animations
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
      { threshold: 0.1 }
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

const SignupPage = () => {
  const [message, setMessage] = useState({ text: '', isError: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

   // Handle form input changes (LOGIC UNCHANGED)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (LOGIC UNCHANGED)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', isError: false });

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ text: 'All fields are required', isError: true });
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', isError: true });
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long', isError: true });
      setIsLoading(false);
      return;
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Signup attempt:', formData);
      setMessage({ text: 'Account created successfully!', isError: false });
    } catch (err) {
      setMessage({ text: 'Signup failed. Please try again.', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading spinner component (LOGIC UNCHANGED)
  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-4 overflow-hidden relative'>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column: Welcome Text */}
          <AnimatedSection direction="left" className="hidden lg:block">
            <Link to="/" className="inline-block text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  CrackIt
                </span>
            </Link>
            <h1 className="text-5xl font-black leading-tight text-white mb-4">
              Join the Innovation Revolution.
            </h1>
            <p className="text-gray-300 text-lg">
              Create your account to start building, collaborating, and competing in the world's most exciting hackathons.
            </p>
          </AnimatedSection>

          {/* Right Column: Signup Form */}
          <AnimatedSection direction="right">
            <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
                <p className="text-gray-300 mt-2">Let's get you started on your journey.</p>
              </div>

              {message.text && (
                <div className={`p-3 rounded-xl text-sm font-medium text-center ${
                  message.isError 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                }`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-gray-300">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" placeholder="Choose a username" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" placeholder="your@email.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" placeholder="Create a strong password" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-white transition">
                      {showPassword ? <Eye className='w-5'/> : <EyeOff className='w-5'/>}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" placeholder="Confirm your password" required />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-white transition">
                      {showConfirmPassword ? <Eye className='w-5'/> : <EyeOff className='w-5'/>}
                    </button>
                  </div>
                </div>
                
                <button type="submit" disabled={isLoading} className="group relative w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
                  <span className="relative z-10 flex items-center">{isLoading ? <><LoadingSpinner />Creating Account...</> : 'Create Free Account'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
              </form>
              
              <div className="text-center pt-4">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300 transition">Sign in here</Link>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;
