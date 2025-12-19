import { useState } from 'react';
import { Music, Download, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WaveformBorder from './WaveformBorder';

interface HeaderProps {
  transparent?: boolean;
  isPlaying?: boolean;
}

export default function Header({ transparent, isPlaying = false }: HeaderProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMobileNav = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${transparent && !isMobileMenuOpen
        ? 'bg-transparent border-transparent pt-4'
        : 'backdrop-blur-md bg-white/90 shadow-sm'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo_bgremove.png" alt="Logo" className="w-12 h-12" />
            <Music className={transparent && !isMobileMenuOpen ? "text-white" : "text-pink-500"} size={24} />
            <span className={`text-xl font-bold ${transparent && !isMobileMenuOpen ? "text-white" : "text-gray-900"}`}>
              ROGER<span className={transparent && !isMobileMenuOpen ? "text-pink-300" : "text-pink-500"}>KEYS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
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

          {/* User Info Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <span className={`text-sm ${transparent ? 'text-white/80' : 'text-gray-700'}`}>Hi, Alice</span>
            <button className={`text-sm transition ${transparent ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-pink-500'}`}>
              Logout
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X size={24} className={transparent && !isMobileMenuOpen ? "text-white" : "text-gray-800"} />
            ) : (
              <Menu size={24} className={transparent ? "text-white" : "text-gray-800"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
          <button onClick={() => handleMobileNav('/store')} className="text-left px-4 py-3 hover:bg-pink-50 rounded-lg text-gray-800 font-medium">
            Store
          </button>
          <button onClick={() => handleMobileNav('/contact')} className="text-left px-4 py-3 hover:bg-pink-50 rounded-lg text-gray-800 font-medium">
            Contact
          </button>
          <button onClick={() => handleMobileNav('/downloads')} className="flex items-center gap-2 text-left px-4 py-3 hover:bg-pink-50 rounded-lg text-gray-800 font-medium">
            <Download size={18} />
            Downloads
          </button>
          <div className="border-t border-gray-100 my-2"></div>
          <div className="flex items-center justify-between px-4 py-2 text-gray-600">
            <span className="text-sm">Hi, Alice</span>
            <button className="text-sm text-pink-500 font-medium">Logout</button>
          </div>
        </div>
      )}

      {/* Live Waveform Border */}
      <WaveformBorder
        isPlaying={isPlaying}
        isHovered={isHovered}
        color={transparent ? '#f9a8d4' : '#ec4899'}
      />
    </header>
  );
}
