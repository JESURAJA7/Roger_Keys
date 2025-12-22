import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import { API_URL } from './config';

const LandingPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const trimmedEmail = email.trim();

        if (!trimmedEmail) return;

        // Admin redirect
        if (trimmedEmail.toLowerCase() === 'admin') {
            navigate('/admin');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: trimmedEmail }),
            });

            if (response.ok) {
                // Success - redirect to store
                navigate('/files');
            } else {
                throw new Error('Subscription failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/Surreal_Piano_on_Ocean_Shore.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-white/20" /> {/* Subtle overlay based on reference */}
            </div>

            {/* Header - Transparent */}
            <div className="absolute top-0 left-0 right-0 z-50">
                <Header transparent />
            </div>


            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 text-center">

                {/* Main Heading similar to reference "KRISTEN SPATH" */}
                {/* <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-gray-900 mb-8 uppercase">
                    Roger Keys
                </h1> */}

                <div className="w-full max-w-md absolute bottom-[10%] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-20 md:bottom-20 md:text-right px-4">
                    <h2 className="text-white text-xl md:text-2xl font-light tracking-widest mb-6 uppercase drop-shadow-md text-center md:text-right">
                        Sign up for updates
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                className={`w-full bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-lg ${error ? 'ring-2 ring-red-500' : ''}`}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-1 top-1 bottom-1 bg-yellow-600 hover:bg-yellow-700 text-white px-6 rounded-full font-medium transition-colors disabled:opacity-70 flex items-center justify-center uppercase text-sm tracking-wider"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : 'Sign Up'}
                            </button>
                        </div>
                        {error && <p className="text-red-200 text-sm mr-2 drop-shadow-md text-center md:text-right">{error}</p>}
                    </form>
                    <div className="mt-4 flex justify-center md:justify-end">
                        <button
                            onClick={() => navigate('/files')}
                            className="text-white/80 hover:text-white text-sm uppercase tracking-widest border-b border-white/30 hover:border-white transition-all pb-0.5"
                        >
                            Enter Store &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
