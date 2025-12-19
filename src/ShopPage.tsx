import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AudioTrack } from "../types";
import { Music, Loader2 } from "lucide-react";
import Header from "./components/Header";
import KeyboardBanner from "./components/KeyboardBanner";
import PianoKeyRow from "./components/PianoKeyRow";

// -----------------------------
//  MAIN COMPONENT
// -----------------------------

interface ShopPageProps {
    addToHistory?: (track: AudioTrack) => void;
}

export default function ShopPage({ addToHistory }: ShopPageProps) {
    // Audio Player State
    const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
    const [tracks, setTracks] = useState<AudioTrack[]>([]);
    const [loading, setLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Email Subscription State
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [subLoading, setSubLoading] = useState(false);
    const [subError, setSubError] = useState('');
    const [subSuccess, setSubSuccess] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubError('');
        setSubSuccess(false);

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
            setSubError('Please enter a valid email address.');
            return;
        }

        setSubLoading(true);

        try {
            const response = await fetch('http://localhost:5055/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmedEmail }),
            });

            if (response.ok) {
                setSubSuccess(true);
                setEmail('');
            } else {
                throw new Error('Subscription failed');
            }
        } catch (err) {
            setSubError('Something went wrong. Please try again.');
        } finally {
            setSubLoading(false);
        }
    };

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://localhost:5055/api/tracks');
                const data = await response.json();
                // Map API data to AudioTrack interface if needed
                const mappedTracks = data.map((t: any) => ({
                    id: t._id,
                    title: t.title,
                    url: t.url
                }));
                setTracks(mappedTracks);
            } catch (err) {
                console.error("Failed to fetch tracks", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTracks();
    }, []);

    const playTrack = (track: AudioTrack) => {
        if (currentTrackId === track.id && audioRef.current) {
            audioRef.current.play();
            return;
        }

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(track.url);
        audio.onended = () => setCurrentTrackId(null);
        audioRef.current = audio;
        audio.play().catch(e => console.error("Playback failed", e));
        setCurrentTrackId(track.id);
    };

    const stopTrack = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setCurrentTrackId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-white/20 to-pink-50/40 z-10" />
                <img
                    src="/roger.jpeg"
                    alt=""
                    className="w-full h-full object-cover opacity-20 transform scale-105"
                />
            </div>

            <Header isPlaying={currentTrackId !== null} />

            <div className="relative z-10 max-w-5xl mx-auto px-4 pb-20 pt-4">

                {/* Keyboard Banner */}
                <KeyboardBanner />

                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2 drop-shadow-sm">
                        Roger Keys Collection
                    </h1>
                    <p className="text-gray-600">Premium .au specific samples</p>
                </div>

                {/* Piano Key List */}
                <div className="flex flex-col shadow-2xl rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm border border-white/50 min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white/50">
                            <Loader2 className="animate-spin text-pink-600 mb-4" size={48} />
                            <p className="text-gray-500 font-medium">Loading collection...</p>
                        </div>
                    ) : tracks.length > 0 ? (
                        tracks.map((track, idx) => (
                            <PianoKeyRow
                                key={track.id}
                                track={track}
                                index={idx}
                                isPlaying={currentTrackId === track.id}
                                onPlay={() => playTrack(track)}
                                onStop={stopTrack}
                                onDownload={() => addToHistory && addToHistory(track)}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white/50">
                            <Music className="text-gray-300 mb-4" size={48} />
                            <p className="text-gray-500 font-medium">No tracks found. Upload some in the Admin Panel!</p>
                        </div>
                    )}
                </div>

                {/* Email Subscription Section */}
                <div className="mt-12 bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-white/50 text-center shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-purple-50/50 z-0"></div>
                    <div className="relative z-10 max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Detailed Updates?</h2>
                        <p className="text-gray-600 mb-6">Join our mailing list for the latest samples and news.</p>

                        {!subSuccess ? (
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className={`w-full bg-white/80 backdrop-blur-sm text-gray-800 px-5 py-3 rounded-full outline-none focus:ring-2 focus:ring-pink-400 transition-all border border-gray-200 ${subError ? 'ring-2 ring-red-300' : ''}`}
                                    />
                                    <button
                                        type="submit"
                                        disabled={subLoading}
                                        className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 rounded-full font-medium transition-all disabled:opacity-70 flex items-center justify-center shadow-md"
                                    >
                                        {subLoading ? <Loader2 className="animate-spin" size={18} /> : 'Join'}
                                    </button>
                                </div>
                                {subError && <p className="text-red-500 text-sm">{subError}</p>}
                            </form>
                        ) : (
                            <div className="bg-green-100 text-green-700 p-4 rounded-xl border border-green-200">
                                <p className="font-medium">Thanks for subscribing!</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-400 text-sm">
                    <p>© 2024 Roger Keys. All audio rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
