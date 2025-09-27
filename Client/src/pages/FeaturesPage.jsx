// src/pages/FeaturesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, Zap, Bot, LayoutDashboard, GitBranch, ArrowRight } from 'lucide-react';

const AnimatedSection = ({ children, className }) => (
    <div className={`animate-fade-in-up ${className}`}>{children}</div>
);

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300 h-full">
        <div className="inline-block p-4 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 rounded-2xl mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const FeaturesPage = () => {
    const coreFeatures = [
        { icon: <Zap className="w-8 h-8" />, title: 'Unified Platform', description: 'Manage the entire hackathon lifecycle from a single, intuitive dashboard. From registration and team formation to project submission and final results.' },
        { icon: <LayoutDashboard className="w-8 h-8" />, title: 'Role-Based Dashboards', description: 'Custom-tailored views for organizers, participants, judges, and mentors, ensuring everyone has the tools they need to succeed.' },
        { icon: <Users className="w-8 h-8" />, title: 'Seamless Teaming', description: 'Participants can easily create teams, invite members, or use our AI Assistant to find teammates with complementary skills.' },
        { icon: <ShieldCheck className="w-8 h-8" />, title: 'Secure & Centralized Submissions', description: 'A dedicated workspace for teams to securely upload their projects, code, presentations, and video demos.' },
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-800">
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
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">A Feature Set Built for <span className="text-indigo-600">Success</span></h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            CrackIt is engineered to eliminate friction and amplify creativity. Explore the tools that make our platform the ultimate hackathon ecosystem.
                        </p>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section className="py-20">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {coreFeatures.map(feature => <FeatureCard key={feature.title} {...feature} />)}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* AI Integration Section */}
                <AnimatedSection>
                    <section className="py-20 bg-white/50 backdrop-blur-lg">
                        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                            <div className="pr-8">
                                <div className="inline-flex items-center bg-purple-100 text-purple-700 font-semibold px-4 py-1 rounded-full mb-4">
                                    <Bot className="w-5 h-5 mr-2" /> AI-Powered
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Enhance Every Stage with AI</h2>
                                <p className="text-gray-600 mb-6">
                                    Our integrated AI tools are designed to streamline processes and foster innovation, providing intelligent assistance from team formation to final judging.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><GitBranch className="w-6 h-6 mr-3 text-indigo-500 flex-shrink-0 mt-1" /><span><span className="font-semibold">AI Team Formation:</span> Intelligently matches participants based on skills and interests.</span></li>
                                    <li className="flex items-start"><Bot className="w-6 h-6 mr-3 text-indigo-500 flex-shrink-0 mt-1" /><span><span className="font-semibold">AI Idea Co-Pilot:</span> Assists teams with brainstorming and refining their project ideas.</span></li>
                                    <li className="flex items-start"><LayoutDashboard className="w-6 h-6 mr-3 text-indigo-500 flex-shrink-0 mt-1" /><span><span className="font-semibold">AI Submission Summarizer:</span> Automatically generates project summaries to streamline the judging process.</span></li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-2xl text-white">
                                <h3 className="text-2xl font-bold mb-4">See AI in Action</h3>
                                <p className="text-indigo-100 mb-6">Imagine a world where finding the perfect teammate is effortless and judges can grasp the core of a complex project in seconds. That's the power of CrackIt's AI.</p>
                                <Link to="/signup" className="group inline-flex items-center justify-center bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-transform duration-300">
                                    Experience It Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </section>
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

export default FeaturesPage;