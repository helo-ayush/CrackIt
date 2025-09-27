// src/pages/CareersPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Code, Palette, Zap, Users, Coffee, ChevronDown } from 'lucide-react';

// Reusable component for scroll animations
const AnimatedSection = ({ children, className }) => {
  return <div className={`animate-fade-in-up ${className}`}>{children}</div>;
};

// Component for individual job listings with expand/collapse functionality
const JobOpening = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex flex-col md:flex-row justify-between items-start md:items-center text-left"
      >
        <div className="flex items-center">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg mr-4">
            {job.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-500">{job.location} • {job.type}</p>
          </div>
        </div>
        <div className="flex items-center text-indigo-500 font-semibold mt-4 md:mt-0">
          View Details
          <ChevronDown className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {/* Collapsible content */}
      <div className={`transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 border-t border-gray-100">
          <h4 className="font-semibold text-gray-700 mt-4 mb-2">Responsibilities:</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {job.responsibilities.map((resp, index) => <li key={index}>{resp}</li>)}
          </ul>
          <button className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-5 rounded-lg hover:shadow-lg transition-shadow">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

const CareersPage = () => {
  const whyWorkWithUs = [
    { icon: <Zap />, title: 'High Impact', description: 'Work on a product that directly empowers innovators and creators worldwide.' },
    { icon: <Users />, title: 'Collaborative Culture', description: 'Join a passionate team where your voice is heard and your ideas matter.' },
    { icon: <Coffee />, title: 'Flexibility & Growth', description: 'We offer remote work options and opportunities for professional development.' }
  ];

  const jobOpenings = [
    { icon: <Code className="w-6 h-6"/>, title: 'Frontend Developer (React)', location: 'Remote', type: 'Full-time', responsibilities: ['Develop new user-facing features using React.js', 'Build reusable components and front-end libraries', 'Optimize applications for maximum speed and scalability'] },
    { icon: <Briefcase className="w-6 h-6"/>, title: 'Backend Developer (Node.js)', location: 'Remote', type: 'Full-time', responsibilities: ['Design and implement scalable RESTful APIs', 'Manage database schemas and data migration', 'Ensure the security and performance of our backend systems'] },
    { icon: <Palette className="w-6 h-6"/>, title: 'UI/UX Designer', location: 'Remote', type: 'Contract', responsibilities: ['Create wireframes, storyboards, and user flows', 'Design intuitive and visually appealing user interfaces', 'Conduct user research and evaluate user feedback'] }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-cyan-50 via-white to-indigo-50 text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            CrackIt
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</Link>
            <Link to="/login" className="text-gray-600 font-medium hover:text-indigo-600">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-5 rounded-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <AnimatedSection>
          <section className="text-center container mx-auto px-6 py-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">Shape the Future With Us</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We're a small team with a big mission. We're looking for passionate, creative individuals to help us build the ultimate platform for innovators.
            </p>
          </section>
        </AnimatedSection>
        
        {/* Why Work With Us Section */}
        <AnimatedSection>
            <section className="py-20 bg-white/50 backdrop-blur-lg">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Join CrackIt?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {whyWorkWithUs.map(item => (
                            <div key={item.title} className="text-center p-6">
                                <div className="inline-block p-4 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 rounded-2xl mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedSection>

        {/* Open Positions */}
        <AnimatedSection>
          <section className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {jobOpenings.map(job => (
                  <JobOpening key={job.title} job={job} />
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="bg-transparent mt-12">
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    CrackIt
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link to="/about" className="text-gray-500 hover:text-indigo-600">About</Link>
                    <Link to="/careers" className="text-gray-500 hover:text-indigo-600">Careers</Link>
                    <Link to="/contact" className="text-gray-500 hover:text-indigo-600">Contact</Link>
                </div>
                <p className="text-gray-500 mt-4 md:mt-0">&copy; {new Date().getFullYear()} CrackIt. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;