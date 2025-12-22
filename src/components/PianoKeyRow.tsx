import React from 'react';
import { Play, Pause, Download, Music } from 'lucide-react';
import { AudioTrack } from '../../types';

interface PianoKeyRowProps {
    track: AudioTrack;
    index: number;
    isPlaying?: boolean;
    onPlay?: () => void;
    onStop?: () => void;
    onDownload?: () => void;
    fileLabel?: string;
}

const PianoKeyRow = ({
    track,
    index,
    isPlaying,
    onPlay,
    onStop,
    onDownload,
    fileLabel = ".au Audio File"
}: PianoKeyRowProps) => {
    // Even index = White, Odd index = Pink
    const isWhite = index % 2 === 0;

    const playClickSound = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) {
            console.error("AudioContext error:", e);
        }
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (onDownload) {
            onDownload();
        }

        // Create a temporary link to download
        const link = document.createElement('a');
        link.href = track.url;
        link.download = track.title; // Suggest filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            className={`
                group
                relative w-full h-20 md:h-24
                flex items-center justify-between px-6 md:px-10
                transition-all duration-200 ease-out
                cursor-pointer
                ${isWhite
                    ? 'bg-white/70 hover:bg-white/90 text-gray-800' // White Key Style
                    : 'bg-pink-400/30 hover:bg-pink-400/50 text-white' // Pink Key Style (Glass)
                }
                backdrop-blur-md
                border-b border-white/20
                first:rounded-t-2xl last:rounded-b-2xl
                hover:scale-[1.01] hover:shadow-lg hover:z-10
                /* To look like a key, maybe add a slight bevel or side border? */
                border-l-4 ${isWhite ? 'border-gray-200' : 'border-pink-300'}
            `}
            onClick={() => {
                playClickSound();
                if (onPlay && onStop) {
                    isPlaying ? onStop() : onPlay();
                }
            }}
        >
            {/* Left Side: Icon + Title */}
            <div className="flex items-center gap-4 md:gap-6">
                <div className={`
                    p-3 rounded-full 
                    ${isWhite ? 'bg-pink-100 text-pink-600' : 'bg-white/20 text-white'}
                    transition-transform group-hover:scale-110
                `}>
                    <Music size={24} />
                </div>
                <div className="flex flex-col">
                    <span className={`text-lg md:text-xl font-bold ${isWhite ? 'text-gray-800' : 'text-white drop-shadow-sm'}`}>
                        {track.title}
                    </span>
                    <span className={`text-xs ${isWhite ? 'text-gray-500' : 'text-pink-100'}`}>
                        {fileLabel}
                    </span>
                </div>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-4">
                {/* PLAY / PAUSE */}
                {onPlay && onStop && (
                    <button
                        onClick={(e) => { e.stopPropagation(); playClickSound(); isPlaying ? onStop() : onPlay(); }}
                        className={`
                            w-12 h-12 flex items-center justify-center rounded-full
                            transition-colors
                            ${isWhite
                                ? 'bg-gray-100 hover:bg-pink-500 hover:text-white text-gray-700'
                                : 'bg-white/20 hover:bg-white hover:text-pink-500 text-white'
                            }
                        `}
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </button>
                )}

                {/* DOWNLOAD */}
                <button
                    onClick={handleDownload}
                    className={`
                        w-12 h-12 flex items-center justify-center rounded-full
                        transition-colors
                        ${isWhite
                            ? 'bg-gray-100 hover:bg-pink-500 hover:text-white text-gray-700'
                            : 'bg-white/20 hover:bg-white hover:text-pink-500 text-white'
                        }
                    `}
                    title="Download"
                >
                    <Download size={20} />
                </button>
            </div>

            {/* Active Indicator Bar */}
            {isPlaying && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500 animate-pulse" />
            )}
        </div>
    );
};

export default PianoKeyRow;
