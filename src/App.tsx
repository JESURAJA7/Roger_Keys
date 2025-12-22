import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FileLibrary from './filelibrary';
import ShopPage from './ShopPage';
import AdminPanel from './AdminPanel';
import LandingPage from './LandingPage';
import ContactPage from './ContactPage';
import { AudioTrack } from '../types';
import Footer from './components/Footer';

function App() {
  const [downloadHistory, setDownloadHistory] = useState<AudioTrack[]>([]);

  const addToHistory = (track: AudioTrack) => {
    setDownloadHistory(prev => {
      // Avoid duplicates
      if (prev.find(t => t.id === track.id)) return prev;
      return [track, ...prev];
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/store" element={<Navigate to="/files" replace />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/files" element={<FileLibrary history={downloadHistory} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
