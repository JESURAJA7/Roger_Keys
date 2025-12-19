import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileLibrary from './filelibrary';
import ShopPage from './ShopPage';
import AdminPanel from './AdminPanel';
import LandingPage from './LandingPage';
import ContactPage from './ContactPage';
import { AudioTrack } from '../types';

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
        <Route path="/store" element={<ShopPage addToHistory={addToHistory} />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/downloads" element={<FileLibrary history={downloadHistory} />} />
      </Routes>
    </Router>
  );
}

export default App;
