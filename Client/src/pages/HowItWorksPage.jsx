// src/pages/HowItWorksPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, UploadCloud, Award, ArrowRight } from 'lucide-react';

const AnimatedSection = ({ children, className }) => (
    <div className={`animate-fade-in-up ${className}`}>{children}</div>
);

const StepCard = ({ icon, step, title, description, isLast = false }) => (
    <div className="relative pl-16">
        {!isLast && <div className="absolute top-12 left-5 h-full w-0.5 bg-indigo-200"></div>}
        <div className="absolute top-0 left-0 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full">
            {icon}
        </div>
        <p className="text-indigo-500 font-semibold mb-1">Step {step}</p>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


const HowItWorksPage = () => {
    const steps = [
        { icon: <Search className="w-6 h-6" />, step: 1, title: 'Discovery & Registration', description: 'Explore a centralized hub of hackathons. Find the perfect challenge and sign up in a single click. Our user-friendly process makes registration and team creation a breeze.' },
        { icon: <Users className="w-6 h-6" />, step: 2, title: 'Project Development', description: 'Collaborate with your team in a dedicated workspace. Utilize our AI Co-Pilot for brainstorming and ideation to bring your vision to life.' },
        { icon: <UploadCloud className="w-6 h-6" />, step: 3, title: 'Secure Submission', description: 'Upload your completed project, source code, and presentation files to our secure, centralized submission portal before the deadline hits.' },
        { icon: <Award className="w-6 h-6" />, step: 4, title: 'Evaluation & Results', description: 'Judges use powerful, streamlined dashboards for scoring. View real-time results and analytics on our automated leaderboards to see who comes out on top.' },
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50 text-gray-800">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/30">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">CrackIt</Link>
                    {/* Add your nav links here if needed */}
                </div>
            </header>

            <main className="pt-24 md:pt-32">
                <AnimatedSection>
                    <section className="text-center container mx-auto px-6 py-16">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">From Idea to Impact, <span className="text-purple-600">Simplified</span></h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            We've designed a seamless, end-to-end workflow that guides you through every stage of the hackathon journey. Here’s how it works for participants and organizers alike.
                        </p>
                    </section>
                </AnimatedSection>

                {/* Timeline Section */}
                <AnimatedSection>
                    <section className="py-20">
                        <div className="container mx-auto px-6 max-w-3xl">
                            <div className="space-y-16">
                                {steps.map((step, index) => (
                                    <StepCard key={step.step} {...step} isLast={index === steps.length - 1} />
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* Call to Action */}
                <AnimatedSection className="py-16">
                    <div className="container mx-auto px-6 text-center">
                        <div className="relative text-center py-16 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden">
                            <h2 className="text-4xl font-bold text-white">Ready to Start Your Journey?</h2>
                            <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">Find your next challenge or host your own breakthrough event on CrackIt.</p>
                            <Link to="/signup" className="mt-8 group inline-flex items-center justify-center bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg">
                                Get Started Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
            <footer className="bg-white/50 backdrop-blur-lg border-t border-gray-200 mt-12">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-center">

                        {/* Column 1: Logo (Aligned Left on Desktop) */}
                        <div className="md:text-left">
                            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                CrackIt
                            </Link>
                        </div>

                        {/* Column 2: Navigation Links (Always Centered) */}
                        <div className="flex justify-center space-x-8">
                            <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">About</Link>
                            <Link to="/careers" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Careers</Link>
                            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Contact</Link>
                        </div>

                        {/* Column 3: Copyright (Aligned Right on Desktop) */}
                        <div className="md:text-right">
                            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} CrackIt. All rights reserved.</p>
                        </div>

                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HowItWorksPage;