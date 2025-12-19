
import React, { useRef, useEffect } from 'react';

interface WaveformBorderProps {
    isPlaying: boolean;
    isHovered: boolean;
    height?: number;
    color?: string; // Fallback color
}

const WaveformBorder: React.FC<WaveformBorderProps> = ({
    isPlaying,
    isHovered,
    height = 4, // Default height of the border area
    color = '#ec4899' // Pink-500 default
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const timeRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize handler
        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = height * 4; // Give it some headroom for waves
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        const render = () => {
            timeRef.current += 0.05; // Base time speed
            const t = timeRef.current;

            const width = canvas.width;
            const h = canvas.height;
            const centerY = h / 2;

            ctx.clearRect(0, 0, width, h);

            // Configuration based on state
            let amplitude = 2;
            let frequency = 0.02;
            let speed = 1;
            let lineWidth = 1.5;

            if (isPlaying) {
                amplitude = 8;
                frequency = 0.05;
                speed = 3;
                lineWidth = 2.5;
            } else if (isHovered) {
                amplitude = 4;
                frequency = 0.03;
                speed = 1.5;
                lineWidth = 2;
            } else {
                // Idle "breathing"
                amplitude = 1.5 + Math.sin(t * 0.5) * 0.5;
            }

            // Create Gradient for playing state
            let strokeStyle: string | CanvasGradient = color;
            if (isPlaying) {
                const gradient = ctx.createLinearGradient(0, 0, width, 0);
                // Animate gradient by shifting color stops or generating based on time
                const hue1 = (t * 10) % 360;
                const hue2 = (t * 10 + 60) % 360;
                gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, 1)`);
                gradient.addColorStop(0.5, `hsla(${hue2}, 70%, 60%, 1)`);
                gradient.addColorStop(1, `hsla(${hue1}, 70%, 60%, 1)`);
                strokeStyle = gradient;
            } else if (isHovered) {
                // Solid Pink on hover, maybe slightly brighter
                strokeStyle = '#f472b6'; // Pink-400
            } else {
                // Subtle gray/pink on idle
                strokeStyle = 'rgba(236, 72, 153, 0.4)';
            }

            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = strokeStyle;
            ctx.lineCap = 'round';

            // Draw Sine Wave
            for (let x = 0; x < width; x++) {
                // Multiple overlapping sine waves for "noise" effect when playing
                let y = centerY;

                if (isPlaying) {
                    // Complex wave for audio simulation
                    y += Math.sin(x * frequency + t * speed) * amplitude;
                    y += Math.sin(x * (frequency * 2) - t * speed * 1.5) * (amplitude / 2);
                    y += Math.sin(x * (frequency * 0.5) + t * speed * 0.5) * (amplitude / 4);
                } else {
                    // Simple gentle wave for idle
                    y += Math.sin(x * frequency + t * speed) * amplitude;
                }

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying, isHovered, height, color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute bottom-[-10px] left-0 pointer-events-none w-full z-50 mix-blend-screen"
            style={{ height: `${height * 4}px` }}
        />
    );
};

export default WaveformBorder;
