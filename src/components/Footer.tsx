import React from 'react';
import { Youtube, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-rose-100 via-purple-100 to-sky-100 bg-[length:400%_400%] animate-gradient-bg border-t border-white/50 py-8 mt-auto z-40 relative shadow-inner">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Animated Brand Name */}
                <div className="group cursor-default">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-gradient-text">
                        Roger Keys
                    </h2>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-8">
                    <a
                        href="https://youtube.com/@roger_keys?si=q5DlEH2SYsiYXCLB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-red-600 transition-colors transform hover:scale-110"
                        title="YouTube"
                    >
                        <Youtube size={24} />
                    </a>

                    <a
                        href="https://www.instagram.com/roger_keys_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-pink-600 transition-colors transform hover:scale-110"
                        title="Instagram"
                    >
                        <Instagram size={24} />
                    </a>

                    <a
                        href="mailto:rogerkeys@gmail.com"
                        className="text-gray-500 hover:text-purple-600 transition-colors transform hover:scale-110"
                        title="Contact Us"
                    >
                        <Mail size={24} />
                    </a>
                </div>

                {/* Optional Copyright Text - minimal */}
                <div className="text-sm text-gray-400 font-medium">
                    © {new Date().getFullYear()} All Rights Reserved
                </div>
            </div>

            {/* Tailwind Animation Config Recommendation if needed, but using standard utilities + custom arbitrary value for simplicity or style tag */}
            <style>{`
                @keyframes gradient-text {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-text {
                    animation: gradient-text 3s ease infinite;
                }
                @keyframes gradient-bg {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-bg {
                    animation: gradient-bg 15s ease infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
