import React from 'react';
import Header from './components/Header';
import { Mail, Phone, MapPin } from 'lucide-react';

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
                                <p className="text-gray-500 mb-2">Our friendly team is here to help.</p>
                                <a href="mailto:hello@rogerkeys.com" className="text-pink-600 font-medium hover:underline">hello@rogerkeys.com</a>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Phone</h3>
                                <p className="text-gray-500 mb-2">Mon-Fri from 8am to 5pm.</p>
                                <a href="tel:+15550000000" className="text-purple-600 font-medium hover:underline">+1 (555) 000-0000</a>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">Office</h3>
                                <p className="text-gray-500 mb-2">Come say hello at our office HQ.</p>
                                <p className="text-gray-800 font-medium">123 Music Lane, Suite 101<br />Los Angeles, CA 90210</p>
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
