// src/pages/AboutPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Users, ShieldCheck, Target, Rocket, Briefcase, GitBranch, ArrowRight } from 'lucide-react';

// A reusable AnimatedSection for smooth scrolling effects
const AnimatedSection = ({ children, className }) => {
  // In a real app, you'd use Intersection Observer here as in your HomePage.jsx
  // For simplicity, we'll just apply a class.
  return <div className={`animate-fade-in-up ${className}`}>{children}</div>;
};

const AboutPage = () => {
  const futureScopes = [
    { icon: <Rocket className="w-8 h-8 text-white" />, title: 'Project Incubation', description: 'Offer resources and mentorship to help the best projects grow into startups after the event.' },
    { icon: <Briefcase className="w-8 h-8 text-white" />, title: '"Hack-to-Hire" Pipeline', description: 'Directly connect top participants with recruiters and job opportunities from sponsors.' },
    { icon: <GitBranch className="w-8 h-8 text-white" />, title: 'Smarter AI Co-Pilot', description: 'Evolve from brainstorming to offering real-time code suggestions and debugging help.' },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-800">
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
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              We're Building the Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Innovation</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              CrackIt was born from a simple observation: hackathons are essential for discovering talent, but the tools to manage them are often cluttered and impersonal. We're here to change that.
            </p>
          </section>
        </AnimatedSection>

        {/* The Problem & The Solution Section */}
        <AnimatedSection>
          <section className="py-20 bg-white/50 backdrop-blur-lg">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* The Problem */}
                <div className="bg-rose-50 border-l-4 border-rose-400 p-8 rounded-r-lg">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem</h2>
                  <p className="text-gray-600">
                    Existing hackathon platforms often lack personalization and create fragmented experiences. This results in a disconnected ecosystem for organizers, participants, and judges alike. We knew there had to be a better way.
                  </p>
                </div>
                {/* The Solution */}
                <div className="bg-emerald-50 border-l-4 border-emerald-400 p-8 rounded-r-lg">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Solution</h2>
                  <p className="text-gray-600">
                    CrackIt is a unified, intuitive, and scalable platform designed to manage innovation challenges seamlessly. We provide an end-to-end solution with AI-driven tools, role-based dashboards, and secure submission workspaces.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Our Vision Section */}
        <AnimatedSection>
          <section className="py-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold text-gray-900">Our Vision for the Future</h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">We're not just a platform; we're a launchpad for careers and companies.</p>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {futureScopes.map(scope => (
                  <div key={scope.title} className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="inline-block bg-white/20 p-4 rounded-full mb-6">
                      {scope.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{scope.title}</h3>
                    <p className="text-indigo-100 leading-relaxed">{scope.description} </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900">Ready to Join the Movement?</h2>
                <p className="mt-3 text-lg text-gray-600">Whether you're hosting an event or looking for your next challenge, CrackIt is for you.</p>
                <Link to="/signup" className="mt-8 group inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Get Started for Free <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
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

export default AboutPage;