import { useState } from 'react';
import { Music, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WaveformBorder from './WaveformBorder';

interface HeaderProps {
  transparent?: boolean;
  isPlaying?: boolean;
}

export default function Header({ transparent, isPlaying = false }: HeaderProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${transparent
        ? 'bg-transparent border-transparent pt-4'
        : 'backdrop-blur-md bg-white/70 shadow-sm'
        // removed border-b border-pink-100 to let WaveformBorder handle it
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo_bgremove.png" alt="Logo" className="w-12 h-12" />
            <Music className={transparent ? "text-white" : "text-pink-500"} size={24} />
            <span className={`text-xl font-bold ${transparent ? "text-white" : "text-gray-900"}`}>
              ROGER<span className={transparent ? "text-pink-300" : "text-pink-500"}>KEYS</span>
            </span>
          </div>

          <nav className="flex items-center gap-8">
            <button
              onClick={() => navigate('/store')}
              className={`font-medium transition ${transparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-pink-500'}`}
            >
              Store
            </button>
            <button
              onClick={() => navigate('/contact')}
              className={`font-medium transition ${transparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-pink-500'}`}
            >
              Contact
            </button>
            <button
              onClick={() => navigate('/downloads')}
              className={`font-medium transition flex items-center gap-2 ${transparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-pink-500'}`}
            >
              <Download size={16} />
              Downloads
            </button>
            {/* <button
              onClick={() => navigate('/admin')}
              className={`font-medium transition ${transparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-pink-500'}`}
            >
              Admin
            </button> */}
          </nav>

          <div className="flex items-center gap-6">
            <span className={`text-sm ${transparent ? 'text-white/80' : 'text-gray-700'}`}>Hi, Alice</span>
            <button className={`text-sm transition ${transparent ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-pink-500'}`}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Live Waveform Border */}
      <WaveformBorder
        isPlaying={isPlaying}
        isHovered={isHovered}
        color={transparent ? '#f9a8d4' : '#ec4899'}
      />
    </header>
  );
}
