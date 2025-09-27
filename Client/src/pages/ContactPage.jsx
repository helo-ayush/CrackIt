// src/pages/ContactPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown } from 'lucide-react';

// Reusable component for scroll animations
const AnimatedSection = ({ children, className }) => {
    return <div className={`animate-fade-in-up ${className}`}>{children}</div>;
};

// Reusable FAQ item component
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <h3 className="font-semibold text-gray-800">{question}</h3>
                <ChevronDown className={`w-5 h-5 text-indigo-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-48' : 'max-h-0'}`}>
                <p className="pt-2 text-gray-600">{answer}</p>
            </div>
        </div>
    );
};

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

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
        { question: "How do I register for a hackathon?", answer: "You can find all active hackathons on our 'Explore' page. Simply click on a hackathon you're interested in and follow the registration instructions." },
        { question: "Can I create a team after registering?", answer: "Yes! You can create or join a team from your participant dashboard after you've successfully registered for an event." },
        { question: "What are the submission requirements?", answer: "Submission requirements vary by event. Please check the 'Rules & Judging Criteria' tab on the specific hackathon's page for detailed information." }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-indigo-50 text-gray-800">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/30">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">CrackIt</Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</Link>
                        <Link to="/login" className="text-gray-600 font-medium hover:text-indigo-600">Login</Link>
                        <Link to="/signup" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-5 rounded-lg">Sign Up</Link>
                    </div>
                </div>
            </header>

            <main className="pt-24 md:pt-32">
                <AnimatedSection>
                    <section className="text-center container mx-auto px-6 pt-16 pb-12">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">Let's Connect</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Have a question or feedback? We'd love to hear from you. Reach out, and we'll get back to you as soon as possible.</p>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section className="pb-20">
                        <div className="container mx-auto px-6 grid lg:grid-cols-5 gap-12">
                            {/* Contact Form */}
                            <div className="lg:col-span-3 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/30">
                                <h2 className="text-2xl font-bold mb-6 flex items-center"><MessageSquare className="w-6 h-6 mr-3 text-indigo-500" />Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 w-full p-3 bg-white/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                                        <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 w-full p-3 bg-white/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500" required />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                                        <textarea id="message" rows="5" value={formData.message} onChange={handleChange} className="mt-1 w-full p-3 bg-white/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500" required></textarea>
                                    </div>
                                    <button type="submit" disabled={status === 'sending'} className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-70 transition-all">
                                        {status === 'sending' ? 'Sending...' : 'Send Message'} <Send className="w-5 h-5 ml-2" />
                                    </button>
                                    {status === 'success' && <p className="text-green-600 text-center mt-4">Message sent successfully!</p>}
                                    {status === 'error' && <p className="text-red-600 text-center mt-4">Please fill out all fields.</p>}
                                </form>
                            </div>

                            {/* Contact Info & FAQs */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30">
                                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                    <div className="space-y-4">
                                        <p className="flex items-center text-gray-600"><Mail className="w-5 h-5 mr-3 text-indigo-500" /> <a href="mailto:hello@crackit.com" className="hover:text-indigo-600">hello@crackit.com</a></p>
                                        <p className="flex items-center text-gray-600"><Phone className="w-5 h-5 mr-3 text-indigo-500" /> (123) 456-7890</p>
                                        <p className="flex items-center text-gray-600"><MapPin className="w-5 h-5 mr-3 text-indigo-500" /> 123 Innovation Drive, Tech City</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30">
                                    <h3 className="text-xl font-semibold mb-2">FAQs</h3>
                                    {faqs.map(faq => <FaqItem key={faq.question} {...faq} />)}
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            </main>

            {/* Footer */}
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

export default ContactPage;