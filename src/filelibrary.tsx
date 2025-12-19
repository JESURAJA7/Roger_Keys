import React, { useState, useRef } from 'react';
import { AudioTrack } from '../types';
import Header from './components/Header';
import KeyboardBanner from "./components/KeyboardBanner";
import PianoKeyRow from "./components/PianoKeyRow";

interface FileLibraryProps {
  history: AudioTrack[];
}

export default function FileLibrary({ history }: FileLibraryProps) {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
            My Downloads
          </h1>
          <p className="text-gray-600">Your collection of .au samples</p>
        </div>

        {/* Piano Key List (History) */}
        <div className="flex flex-col shadow-2xl rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm border border-white/50">
          {history.length > 0 ? (
            history.map((track, idx) => (
              <PianoKeyRow
                key={track.id}
                track={track}
                index={idx}
                isPlaying={currentTrackId === track.id}
                onPlay={() => playTrack(track)}
                onStop={stopTrack}
              />
            ))
          ) : (
            <div className="p-10 text-center text-gray-500">
              No downloads yet. Visit the store to add some tracks!
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2024 Roger Keys. All audio rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
