import React, { useRef, useState, useEffect } from 'react';
import { AudioFile } from '../types';
import { Play, Pause, Download, Clock } from 'lucide-react';
import Header from './components/Header';

interface FileDetailProps {
  file: AudioFile;
  onBack: () => void;
}

export default function FileDetail({ file, onBack }: FileDetailProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.cloudinary_audio_url;
    link.download = `${file.title}.${file.file_type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-pink-50/30 to-gray-50">
      <Header isPlaying={isPlaying} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="backdrop-blur-xl bg-white/70 border border-pink-100 rounded-2xl p-6 shadow-[0_8px_32px_rgba(236,72,153,0.1)] sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg">
                  A
                </div>
                <h3 className="font-bold text-gray-900">Roget Keys User</h3>
                <p className="text-xs text-gray-500 font-mono mt-1">234x6cbd6378</p>
                <p className="text-xs text-gray-500 font-mono">1080x6120</p>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition">
                  Profile & Preferences
                </button>
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition">
                  Payment Methods
                </button>
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition">
                  Notification & Downloads
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-9">
            <div className="backdrop-blur-xl bg-white/70 border border-pink-100 rounded-2xl p-8 shadow-[0_8px_32px_rgba(236,72,153,0.1)]">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-pink-500 font-semibold text-sm">{file.brand}</span>
                <span className="text-gray-400">•</span>
                {file.duration && (
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock size={14} />
                    {formatTime(file.duration)}
                  </span>
                )}
                <span className="text-gray-400">•</span>
                <button className="text-sm text-pink-500 font-medium hover:text-pink-600 flex items-center gap-1">
                  <Download size={14} />
                  Download
                </button>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {file.title}
              </h1>

              <p className="text-gray-700 leading-relaxed mb-8">
                {file.description}
              </p>

              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">Polyphony</div>
                    <div className="text-sm text-gray-700">16 Roices</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">Kest</div>
                    <div className="text-sm text-gray-700">61 Semi-weighted</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">Condition</div>
                    <div className="text-sm text-gray-700">New</div>
                  </div>
                  <div className="col-span-3">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Overlastore</div>
                    <div className="text-sm text-gray-700">3 per voice</div>
                  </div>
                </div>
              </div>

              {file.file_type === 'aus' && (
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-6 py-2 backdrop-blur-xl bg-white/70 border border-pink-100 text-gray-900 rounded-lg hover:bg-pink-50 transition shadow-sm"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    Play
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-2 backdrop-blur-xl bg-white/70 border border-pink-100 text-gray-900 rounded-lg hover:bg-pink-50 transition shadow-sm"
                  >
                    <Download size={18} />
                    Download
                  </button>
                  <audio
                    ref={audioRef}
                    src={file.cloudinary_audio_url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>
              )}

              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 rounded-xl shadow-[0_8px_32px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_48px_rgba(236,72,153,0.4)] transition-all"
              >
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
