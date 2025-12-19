import React, { useEffect, useState, useRef } from 'react';

// ---------------------------------------------------------------------------
//  PIANO DATA
// ---------------------------------------------------------------------------
// Generate keys for 4 octaves
const generateKeys = () => {
    const keys = [];
    const octaves = 4;
    for (let i = 0; i < octaves; i++) {
        // One octave: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
        keys.push(
            { type: 'white', note: 'C' },
            { type: 'black', note: 'C#' },
            { type: 'white', note: 'D' },
            { type: 'black', note: 'D#' },
            { type: 'white', note: 'E' },
            { type: 'white', note: 'F' },
            { type: 'black', note: 'F#' },
            { type: 'white', note: 'G' },
            { type: 'black', note: 'G#' },
            { type: 'white', note: 'A' },
            { type: 'black', note: 'A#' },
            { type: 'white', note: 'B' }
        );
    }
    // Add final C
    keys.push({ type: 'white', note: 'C' });
    return keys;
};

const PIANO_KEYS = generateKeys();

// ---------------------------------------------------------------------------
//  COMPONENT
// ---------------------------------------------------------------------------
export default function RealisticKeyboard() {
    const [activeIndices, setActiveIndices] = useState<number[]>([]);

    // Auto-play Animation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            // Pick 1-3 random keys to press
            const count = Math.floor(Math.random() * 3) + 1;
            const newIndices = [];
            for (let i = 0; i < count; i++) {
                newIndices.push(Math.floor(Math.random() * PIANO_KEYS.length));
            }

            setActiveIndices(newIndices);

            // Release after short delay
            setTimeout(() => setActiveIndices([]), 300);

        }, 2000); // Slower rhythm to allow user interaction to shine

        return () => clearInterval(interval);
    }, []);

    const handleKeyClick = (index: number) => {
        setActiveIndices([index]);
        setTimeout(() => setActiveIndices([]), 300);
    };

    return (
        <div className="w-full h-[320px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black perspective-1000 relative">

            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-roger-accent/10 to-transparent pointer-events-none" />

            {/* 
        3D Scene Container 
      */}
            <div
                className="relative transform-style-3d transition-transform duration-500 w-full max-w-7xl px-4"
                style={{
                    transform: 'perspective(1500px) rotateX(25deg) translateY(-20px)',
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Piano Chassis/Bed */}
                <div
                    className="
            relative w-full h-64
            bg-gray-900 rounded-lg
            shadow-[0_20px_50px_rgba(0,0,0,0.8)]
            border-t-4 border-gray-800
            flex items-end justify-center
            pb-4 px-2
          "
                    style={{
                        boxShadow: '0 50px 80px -20px rgba(0,0,0,0.9), inset 0 10px 20px rgba(0,0,0,0.5)'
                    }}
                >
                    {/* Red Felt Strip */}
                    <div className="absolute top-[3.5rem] left-2 right-2 h-2 bg-red-900/80 shadow-inner z-0" />

                    {/* Keys Container */}
                    <div className="relative flex w-full h-48 justify-center z-10">
                        {PIANO_KEYS.map((key, index) => {
                            const isActive = activeIndices.includes(index);

                            if (key.type === 'white') {
                                return (
                                    <div
                                        key={index}
                                        onMouseDown={() => handleKeyClick(index)}
                                        className="
                      relative flex-1 h-full
                      bg-gradient-to-b from-white to-gray-200
                      border-x border-gray-300
                      rounded-b-md
                      transform-style-3d
                      transition-transform duration-100 ease-out
                      cursor-pointer hover:bg-gray-100
                    "
                                        style={{
                                            transform: isActive ? 'rotateX(-5deg) translateY(2px)' : 'rotateX(0)',
                                            transformOrigin: 'top center',
                                            boxShadow: isActive
                                                ? 'inset 0 -5px 10px rgba(0,0,0,0.1)'
                                                : 'inset 0 -10px 20px rgba(0,0,0,0.1), 0 5px 5px rgba(0,0,0,0.3)',
                                            zIndex: 1
                                        }}
                                    >
                                        {/* Key Front Face (Thickness) */}
                                        <div
                                            className="absolute bottom-[-10px] left-0 w-full h-[10px] bg-gray-300 rounded-b-md"
                                            style={{ transform: 'rotateX(-90deg)', transformOrigin: 'top' }}
                                        />
                                    </div>
                                );
                            } else {
                                // Black Key
                                // We need to position it absolutely relative to the previous white key or use negative margins
                                // A simpler way in flex is to give it 0 width and visible overflow, or use absolute positioning.
                                // Here we'll use a wrapper or absolute positioning.
                                // Actually, in a flex row of white keys, black keys sit *between* them.
                                // Let's use a different strategy: Render ALL keys in flex, but black keys have negative margins to overlap.

                                return (
                                    <div
                                        key={index}
                                        onMouseDown={() => handleKeyClick(index)}
                                        className="
                      relative w-[3%] h-[60%] -mx-[1.5%]
                      bg-gradient-to-b from-gray-800 to-black
                      rounded-b-sm
                      z-20
                      transform-style-3d
                      transition-transform duration-100 ease-out
                      cursor-pointer hover:bg-gray-900
                    "
                                        style={{
                                            transform: isActive ? 'rotateX(-5deg) translateY(2px)' : 'rotateX(0)',
                                            transformOrigin: 'top center',
                                            boxShadow: isActive
                                                ? 'inset 0 -2px 5px rgba(255,255,255,0.1)'
                                                : '0 5px 10px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.1)',
                                            backgroundImage: 'linear-gradient(to bottom, #333, #000)'
                                        }}
                                    >
                                        {/* Key Front Face */}
                                        <div
                                            className="absolute bottom-[-8px] left-0 w-full h-[8px] bg-gray-900 rounded-b-sm"
                                            style={{ transform: 'rotateX(-90deg)', transformOrigin: 'top' }}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
