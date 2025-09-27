// Import necessary hooks (useState, useEffect, useRef) and components from React and React Router
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Component: IconSet
// A centralized object holding all SVG icon components for easy access and reuse.
const IconSet = {
  ArrowRight: () => <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>,
  Discover: () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
  TeamUp: () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
  Submit: () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>,
  Evaluate: () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  Menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>,
  Close: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>,
};

// Component: AnimatedSection
// A reusable wrapper that animates its children (fades/slides in) when they scroll into view.
const AnimatedSection = ({ children, direction = 'up' }) => {
  // State: Tracks if the component is visible on screen.
  const [isVisible, setIsVisible] = useState(false);
  // Ref: A reference to the DOM element for the observer to watch.
  const ref = useRef(null);

  // Effect: Sets up the Intersection Observer to detect when the component is in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on whether the element is intersecting (visible).
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Triggers when 10% of the element is visible.
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup: Stops observing the element when the component unmounts.
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Function: Determines the correct animation classes based on visibility and direction.
  const getDirectionClasses = () => {
    switch (direction) {
      case 'left':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10';
      case 'right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10';
      default: // 'up'
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${getDirectionClasses()}`}
    >
      {children}
    </div>
  );
};

// Component: HomePage
// The main landing page component containing all sections and animations.
const HomePage = () => {
  // Data: An array of objects for the feature cards section.
  const features = [
    { icon: <IconSet.Discover />, title: 'Hackathon Discovery', description: 'Explore a central hub of challenges tailored to your interests.' },
    { icon: <IconSet.TeamUp />, title: 'Easy Registration & Teaming', description: 'A user-friendly signup process that makes team creation a breeze.' },
    { icon: <IconSet.Submit />, title: 'Secure Submission Workspace', description: 'A centralized and secure portal to upload your projects and code.' },
    { icon: <IconSet.Evaluate />, title: 'Seamless Evaluations', description: 'Dedicated dashboards for judges with role-based access for scoring.' },
  ];

  // State for the headline typing animation
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const wordsToType = ["Innovation", "Collaboration", "Creation"];

  // State for the mobile navigation menu (open/closed)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for the cursor parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Effect for the typing animation logic
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = wordsToType[wordIndex];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);
      setText(updatedText);
      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % wordsToType.length);
      }
    };
    const typingSpeed = isDeleting ? 100 : 200;
    const timeoutId = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex]);

  // Effect for the cursor parallax logic
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Effect to lock body scroll when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Calculations for the cursor parallax effect
  const xOffset = (mousePosition.x - window.innerWidth / 2) / (window.innerWidth / 2);
  const yOffset = (mousePosition.y - window.innerHeight / 2) / (window.innerHeight / 2);

  return (
    // Element: Page Container
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-gray-800 overflow-x-clip">

      {/* Element: Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10rem] -left-24 w-72 h-72 md:w-[32rem] md:h-[32rem] bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-[blob_10s_infinite]"></div>
        <div className="absolute top-[-2rem] right-0 w-72 h-72 md:w-[32rem] md:h-[32rem] bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-[blob_10s_infinite] [animation-delay:2000ms]"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 md:w-[32rem] md:h-[32rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-[blob_10s_infinite] [animation-delay:4000ms]"></div>
      </div>

      {/* Element: Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-30"> {/* z-30 to be below menu overlay */}
        <div className="container mx-auto px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-lg border-b border-white/30">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            CrackIt
          </Link>

          {/* Menu: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</Link>
            <Link to="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How It Works</Link>
            <Link to="/login" className="text-gray-600 font-medium hover:text-indigo-600">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-5 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Sign Up
            </Link>
          </div>

          {/* Button: Mobile Menu Toggle */}
          <button className="md:hidden text-gray-700 z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IconSet.Close /> : <IconSet.Menu />}
          </button>
        </div>
      </header>

      {/* Element: Mobile Menu Panel & Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsMenuOpen(false)}></div>

        {/* Menu Panel */}
        <div className={`absolute top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="container mx-auto px-6 pt-24 pb-8 flex flex-col space-y-4">
            <Link to="#features" className="text-gray-700 hover:text-indigo-600 text-lg py-2" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link to="#how-it-works" className="text-gray-700 hover:text-indigo-600 text-lg py-2" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
            <hr className="border-gray-200" />
            <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium text-lg py-2" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-5 rounded-lg text-center mt-4" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Element: Main Content */}
      <main className="pt-24 md:pt-32">

        {/* Section: Hero */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left z-10">
              <h1 className="text-3xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                The Ultimate Platform for{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 min-h-[48px] md:min-h-[72px] inline-block">
                  {text || '\u00A0'}
                </span>
                <span className="text-indigo-600 animate-[blink_0.7s_infinite]">|</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                Host, manage, and participate in hackathons seamlessly. Innovortex provides the tools you need to bring brilliant ideas to life.
              </p>
              <div className="mt-8 flex justify-center md:justify-start gap-4">
                <Link to="/hackathons" className="group inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Explore Hackathons <IconSet.ArrowRight />
                </Link>
              </div>
            </div>

            <div className="relative h-64 md:h-96">
              <div className="absolute w-full h-full grid grid-cols-3 grid-rows-3 gap-4 transition-transform duration-300 ease-out" style={{ transform: `translateX(${xOffset * -10}px) translateY(${yOffset * -10}px) rotate(-6deg)` }}>
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-4 transition-transform duration-300 ease-out" style={{ transform: `translateX(${xOffset * 25}px) translateY(${yOffset * 25}px)` }}>
                  <div className="w-8 h-1.5 bg-green-400 rounded-full"></div>
                  <div className="w-12 h-1.5 bg-green-300 rounded-full mt-2"></div>
                </div>
                <div className="col-span-2 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-4 transition-transform duration-300 ease-out" style={{ transform: `translateX(${xOffset * -15}px) translateY(${yOffset * -15}px)` }}>
                  <div className="w-full h-1.5 bg-indigo-400 rounded-full"></div>
                  <div className="w-10/12 h-1.5 bg-indigo-300 rounded-full mt-2"></div>
                </div>
                <div className="col-span-2 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-4 transition-transform duration-300 ease-out" style={{ transform: `translateX(${xOffset * 20}px) translateY(${yOffset * 20}px)` }}>
                  <div className="w-full h-1.5 bg-yellow-400 rounded-full"></div>
                  <div className="w-10/12 h-1.5 bg-yellow-300 rounded-full mt-2"></div>
                </div>
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-4 transition-transform duration-300 ease-out" style={{ transform: `translateX(${xOffset * -30}px) translateY(${yOffset * -30}px)` }}>
                  <div className="w-8 h-1.5 bg-pink-400 rounded-full"></div>
                  <div className="w-12 h-1.5 bg-pink-300 rounded-full mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Trusted By */}
        <section className="py-12">
          <AnimatedSection>
            <div className="container mx-auto px-6 text-center">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Trusted by the world's best innovators</h3>
              <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-16 gap-y-4 mt-6 opacity-60">
                <p className="font-bold text-xl">InnovateCorp</p>
                <p className="font-bold text-xl">QuantumLeap U</p>
                <p className="font-bold text-xl">CodeFoundry</p>
                <p className="font-bold text-xl">NextGen Ventures</p>
                <p className="font-bold text-xl">DevSphere</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Section: Features */}
        <section id="features" className="py-20 bg-white/50 backdrop-blur-lg">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900">Everything You Need, All In One Place</h2>
                <p className="mt-3 text-lg text-gray-600">Streamline your entire hackathon workflow from start to finish.</p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <AnimatedSection key={feature.title}>
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300 h-full">
                    <div className="inline-block p-4 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 rounded-2xl mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Section: How it Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900">Launch in 3 Simple Steps</h2>
                <p className="mt-3 text-lg text-gray-600">A smooth and intuitive process for organizers and participants.</p>
              </div>
            </AnimatedSection>
            <div className="relative">
              <div className="hidden md:block absolute top-5 left-1/2 w-0.5 h-full bg-indigo-100 -translate-x-1/2"></div>
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center mb-12">
                <AnimatedSection direction="left">
                  <div className="text-center md:text-right md:pr-12">
                    <p className="text-indigo-500 font-semibold mb-1">Step 1</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Create & Customize</h3>
                    <p className="text-gray-600">Define your hackathon's theme, rules, and prizes with our easy-to-use event builder.</p>
                  </div>
                </AnimatedSection>
                <div className="flex justify-center md:justify-start mt-4 md:mt-0"></div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center mb-12">
                <div className="flex justify-center md:justify-end order-last md:order-first mt-4 md:mt-0"></div>
                <AnimatedSection direction="right">
                  <div className="text-center md:text-left md:pl-12">
                    <p className="text-indigo-500 font-semibold mb-1">Step 2</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Engage & Collaborate</h3>
                    <p className="text-gray-600">Invite participants, facilitate team formation, and keep everyone updated with built-in communication tools.</p>
                  </div>
                </AnimatedSection>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <AnimatedSection direction="left">
                  <div className="text-center md:text-right md:pr-12">
                    <p className="text-indigo-500 font-semibold mb-1">Step 3</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Evaluate & Announce</h3>
                    <p className="text-gray-600">Streamline judging with powerful dashboards and announce winners with automated leaderboards.</p>
                  </div>
                </AnimatedSection>
                <div className="flex justify-center md:justify-start mt-4 md:mt-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Final Call to Action */}
        <section className="py-20">
          <AnimatedSection>
            <div className="container mx-auto px-6">
              <div className="relative text-center py-16 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden">
                <h2 className="text-4xl font-bold text-white">Ready to Start Your Innovation Journey?</h2>
                <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">Join thousands of innovators and host your next breakthrough event on Innovortex.</p>
                <Link to="/signup" className="mt-8 group inline-flex items-center justify-center bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg">
                  Sign Up for Free <IconSet.ArrowRight />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* Element: Footer */}
      <footer className="bg-transparent mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              CrackIt
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/about" className="text-gray-500 hover:text-indigo-600">About</Link>
                <Link to="/careers" className="text-gray-500 hover:text-indigo-600">Careers</Link>
                <Link to="/contact" className="text-gray-500 hover:text-indigo-600">Contact</Link>
              </div>
            </div>
            <p className="text-gray-500 mt-4 md:mt-0">&copy; {new Date().getFullYear()} Innovortex. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
