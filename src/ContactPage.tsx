import React from 'react';
import Header from './components/Header';
import { Mail, Phone, MapPin, Youtube } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />

            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-gray-600 text-lg">We'd love to hear from you. Here's how you can reach us.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-pink-100 text-pink-600 rounded-lg">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Email</h3>

                                <a href="mailto:hello@rogerkeys.com" className="text-pink-600 font-medium hover:underline">psr06122000@gmail.com</a>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                                <Youtube size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">YouTube</h3>
                                <p className="text-gray-500 mb-2">Watch our latest Video.</p>
                                <a href="https://youtube.com/@roger_keys?si=q5DlEH2SYsiYXCLB" target="_blank" rel="noopener noreferrer" className="text-red-600 font-medium hover:underline">@roger_keys</a>
                            </div>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="button" className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
