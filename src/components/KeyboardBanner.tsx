import React from 'react';

// -----------------------------
//  KEYBOARD BANNER COMPONENT
// -----------------------------
const KeyboardBanner = () => {
    // Generate 2 Octaves: 
    // Octave 1: C3 -> B3
    // Octave 2: C4 -> B4
    // Plus high C5
    // Adjusted to start from F for range variation or just standard C-C
    // Let's do 2 Full Octaves starting from C

    // Notes structure for rendering text
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const sharps = ['C#', 'D#', 'F#', 'G#', 'A#'];

    // Helper to generate keys for an octave
    const generateOctave = (octaveNum: number) => {
        return notes.map(note => ({ note, octave: octaveNum, type: 'white' }));
    };

    // Helper to generate sharps for an octave (with position offsets)
    // C# is between C(0) and D(1) -> Left ~75% of key width relative to C
    // D# is between D(1) and E(2) -> Left ~175%
    // F# is between F(3) and G(4) -> Left ~375%
    // G# is between G(4) and A(5) -> Left ~475%
    // A# is between A(5) and B(6) -> Left ~575%
    const whiteKeys = [
        ...generateOctave(3),
        ...generateOctave(4),
        { note: 'C', octave: 5, type: 'white' } // High C
    ];

    // Calculated offsets for black keys based on 12-keys-per-octave or visual spacing
    // Visual spacing: 
    // White keys are indices 0..6 per octave
    // Black keys positions (relative to octave start):
    // C#: 0.75, D#: 1.75, F#: 3.75, G#: 4.75, A#: 5.75
    const blackKeyOffsets = [0.75, 1.75, 3.75, 4.75, 5.75]; // Multiplier of white key width

    const blackKeys = [];
    [3, 4].forEach((octave, octaveIdx) => {
        sharps.forEach((note, idx) => {
            // Absolute position = (octaveIndex * 7 keys) + offset
            const offset = (octaveIdx * 7) + blackKeyOffsets[idx];
            blackKeys.push({ note, offset });
        });
    });

    return (
        <div className="w-full flex justify-center py-8 mb-10 overflow-hidden">
            <div className="
                backdrop-blur-xl bg-gradient-to-br from-pink-50/90 to-white/80 
                rounded-3xl p-4 md:p-8 
                border border-pink-100 
                shadow-[0_8px_32px_rgba(236,72,153,0.15)]
                max-w-full overflow-x-auto scrollbar-hide
            ">
                <div className="relative flex gap-1 min-w-max mx-auto">
                    {/* WHITE KEYS */}
                    {whiteKeys.map((k, idx) => (
                        <div
                            key={`${k.note}${k.octave}-${idx}`}
                            className="
                                relative w-10 md:w-12 h-24 md:h-32
                                bg-gradient-to-b from-white to-gray-50 
                                rounded-b-lg border-x border-gray-200 
                                shadow-lg flex items-end justify-center pb-2
                                cursor-pointer flex-shrink-0
                                hover:bg-gradient-to-b hover:from-white hover:to-pink-100
                                hover:shadow-md hover:translate-y-[2px]
                                active:shadow-inner active:translate-y-[4px]
                                transition-all duration-150 ease-out
                            "
                        >
                            <span className="text-[0.6rem] md:text-xs font-bold text-gray-700 select-none pointer-events-none mb-1">
                                {k.note}{k.octave}
                            </span>
                        </div>
                    ))}

                    {/* BLACK KEYS */}
                    {blackKeys.map((k, idx) => (
                        <div
                            key={k.note + idx}
                            className="
                                absolute w-6 md:w-8 h-16 md:h-20
                                bg-gradient-to-b from-gray-800 to-black 
                                rounded-b-md shadow-xl z-10
                                cursor-pointer
                                hover:bg-gradient-to-b hover:from-gray-700 hover:to-gray-900
                                hover:translate-y-[2px]
                                active:translate-y-[4px] active:shadow-none
                                transition-all duration-150 ease-out
                            "
                            style={{
                                // Base unit is roughly 2.75rem (w-10 + gap) on mobile, 3.25rem on desktop
                                // Detailed calculation: 
                                // White key is w-10 (2.5rem) + gap-1 (0.25rem) = 2.75rem spacing unit
                                // Desktop: w-12 (3rem) + gap-1 (0.25rem) = 3.25rem spacing unit
                                // But `left` needs to be dynamic. 
                                // Tailwind arbitrary values or style prop. 
                                // Let's use calc() for responsiveness if possible, or media query in style? 
                                // Easier: Use standard rem units and assume a breakpoint switch.
                                // Mobile unit approx 2.75rem, Desktop 3.25rem.
                                left: `calc(${k.offset} * (2.5rem + 0.25rem))`, // Default to mobile size
                            }}
                        >
                            {/* Override left for desktop via a specialized class or cleaner inline style handling with media query logic would be hard in inline styles. 
                                Instead, let's use a container query approach or just sticking to one size unit and scaling the parent? 
                                Or simply render two sets: one for mobile, one for desktop? No, that's heavy.
                                
                                Better approach: Use % based width? No, keys need fixed aspect.
                                
                                CSS Variables!
                             */}
                            <span className="text-[0.4rem] md:text-[0.5rem] font-bold text-white absolute bottom-1 left-1/2 -translate-x-1/2 select-none pointer-events-none">
                                {k.note}
                            </span>
                        </div>
                    ))}

                    {/* Because inline styles for `left` are hard to make responsive (2.75rem vs 3.25rem), 
                        we will inject a <style> block or use a CSS variable on the container 
                    */}
                    <style>{`
                        .relative {
                            --key-unit: 2.75rem; /* w-10 (2.5) + gap-1 (0.25) */
                        }
                        @media (min-width: 768px) {
                            .relative {
                                --key-unit: 3.25rem; /* w-12 (3) + gap-1 (0.25) */
                            }
                        }
                    `}</style>
                </div>
            </div>

            {/* Fix for the black keys loop re-render with variable */}
            {blackKeys.map((k, idx) => (
                // We need to render the black keys AGAIN here? No, the previous map block is fine IF we can apply the variable.
                // But wait, the previous map is inside general JSX flow.
                // Correct logic for keys above:
                null
            ))}
        </div>
    );
};

// Re-write the component cleanly to fix the logic flow above
export default function KeyboardBannerComponent() {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const sharps = ['C#', 'D#', 'F#', 'G#', 'A#'];

    const generateOctave = (octaveNum: number) => {
        return notes.map(note => ({ note, octave: octaveNum }));
    };

    const whiteKeys = [
        ...generateOctave(3),
        ...generateOctave(4),
        { note: 'C', octave: 5 }
    ];

    // 0.75, 1.75 etc relative to white key index
    const blackKeyOffsets = [0.75, 1.75, 3.75, 4.75, 5.75];

    const blackKeys: { note: string; offset: number }[] = [];
    [3, 4].forEach((octave, octaveIdx) => {
        sharps.forEach((note, idx) => {
            const offset = (octaveIdx * 7) + blackKeyOffsets[idx];
            blackKeys.push({ note, offset });
        });
    });

    return (
        <div className="w-full flex justify-center py-8 mb-10 overflow-hidden">
            <div className="
                backdrop-blur-xl bg-gradient-to-br from-pink-50/90 to-white/80 
                rounded-3xl p-4 md:p-8 
                border border-pink-100 
                shadow-[0_8px_32px_rgba(236,72,153,0.15)]
                max-w-full overflow-x-auto scrollbar-hide
            ">
                {/* Container for keys with CSS variable for spacing */}
                <div
                    className="relative flex gap-1 min-w-max mx-auto key-container"
                    style={{} as React.CSSProperties}
                >
                    <style>{`
                        .key-container {
                            --key-spacing: 2.75rem;
                        }
                        @media (min-width: 768px) {
                            .key-container {
                                --key-spacing: 3.25rem;
                            }
                        }
                    `}</style>

                    {whiteKeys.map((k, idx) => (
                        <div
                            key={`${k.note}${k.octave}-${idx}`}
                            className="
                                relative w-10 md:w-12 h-24 md:h-32
                                bg-gradient-to-b from-white to-gray-50 
                                rounded-b-lg border-x border-gray-200 
                                shadow-lg flex items-end justify-center pb-2
                                cursor-pointer flex-shrink-0
                                hover:bg-gradient-to-b hover:from-white hover:to-pink-100
                                hover:shadow-md hover:translate-y-[2px]
                                active:shadow-inner active:translate-y-[4px]
                                transition-all duration-150 ease-out z-0
                            "
                        >
                            <span className="text-[0.6rem] md:text-xs font-bold text-gray-700 select-none pointer-events-none mb-1">
                                {k.note}{k.octave}
                            </span>
                        </div>
                    ))}

                    {blackKeys.map((k, idx) => (
                        <div
                            key={`black-${idx}`}
                            className="
                                absolute w-6 md:w-8 h-16 md:h-20
                                bg-gradient-to-b from-gray-800 to-black 
                                rounded-b-md shadow-xl z-10
                                cursor-pointer
                                hover:bg-gradient-to-b hover:from-gray-700 hover:to-gray-900
                                hover:translate-y-[2px]
                                active:translate-y-[4px] active:shadow-none
                                transition-all duration-150 ease-out
                            "
                            style={{
                                left: `calc(${k.offset} * var(--key-spacing))`,
                            }}
                        >
                            <span className="text-[0.4rem] md:text-[0.5rem] font-bold text-white absolute bottom-1 left-1/2 -translate-x-1/2 select-none pointer-events-none">
                                {k.note}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
