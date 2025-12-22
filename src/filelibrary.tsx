import React, { useState, useRef, useEffect } from 'react';
import { AudioTrack } from '../types';
import Header from './components/Header';
import KeyboardBanner from "./components/KeyboardBanner";
import PianoKeyRow from "./components/PianoKeyRow";
import { API_URL } from './config';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FileLibraryProps {
  history: AudioTrack[];
}

interface LocalFolder {
  name: string;
  files?: string[];
  fileCount?: number;
}

export default function FileLibrary({ history }: FileLibraryProps) {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);

  // Data State
  const [folders, setFolders] = useState<LocalFolder[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch Folders or Files based on state
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/api/local-files?page=${currentPage}&limit=${itemsPerPage}`;

        if (selectedFolder) {
          // Fetch Files
          url += `&mode=files&folderName=${encodeURIComponent(selectedFolder)}`;
          const res = await fetch(url);
          const data = await res.json();
          setFiles(data.files || []);
          setTotalPages(data.totalPages || 1);
        } else {
          // Fetch Folders
          url += `&mode=folders`;
          const res = await fetch(url);
          const data = await res.json();
          setFolders(data.folders || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedFolder]);

  // Reset page when switching views
  const handleFolderClick = (folderName: string) => {
    setSelectedFolder(folderName);
    setCurrentPage(1);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
    setCurrentPage(1);
    setFiles([]);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const playTrack = (track: AudioTrack) => {
    if (currentTrackId === track.id && audioRef.current) {
      audioRef.current.play();
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      // Reset if switching tracks
      audioRef.current.currentTime = 0;
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

  // Map current files to AudioTrack format
  const tracks: AudioTrack[] = files.map((file, idx) => ({
    id: `${selectedFolder}-${file}-${idx}`,
    title: file,
    url: `/Audio/${selectedFolder}/${file}`,
    price: 0,
    currency: 'USD',
    originalPrice: 0,
    tags: [],
    category: 'sample',
    coverImage: "",
    date: new Date().toISOString()
  }));

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
            {selectedFolder ? selectedFolder : "Audio Collection"}
          </h1>
          <p className="text-gray-600">
            {selectedFolder ? "Select a track to play" : "Browse your local audio folders"}
          </p>
        </div>

        {/* Content Area */}
        {selectedFolder ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={handleBackToFolders}
              className="self-start px-4 py-2 bg-white/50 hover:bg-white/80 rounded-lg text-gray-700 font-medium transition-all"
            >
              ← Back to Folders
            </button>

            <div className="flex flex-col shadow-2xl rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm border border-white/50">
              {loading ? (
                <div className="p-10 text-center text-gray-500">Loading files...</div>
              ) : tracks.length > 0 ? (
                tracks.map((track, idx) => (
                  <PianoKeyRow
                    key={track.id}
                    track={track}
                    index={idx}
                    fileLabel=".sty File"
                  />
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">
                  No matching files found in this folder.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-gray-500 py-10">Loading folders...</div>
            ) : folders.length > 0 ? (
              folders.map((folder) => (
                <div
                  key={folder.name}
                  onClick={() => handleFolderClick(folder.name)}
                  className="bg-white/30 backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📁</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{folder.name}</h3>
                  <p className="text-pink-600 font-medium">
                    {folder.fileCount !== undefined ? `${folder.fileCount} items` : 'View items'}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">No folders found.</div>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all ${currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-pink-600 hover:bg-pink-100 bg-white/50 shadow-sm'
                }`}
            >
              <ChevronLeft size={24} />
            </button>

            <span className="text-gray-700 font-medium px-4 py-1 bg-white/40 rounded-full border border-white/50 backdrop-blur-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full transition-all ${currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-pink-600 hover:bg-pink-100 bg-white/50 shadow-sm'
                }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2024 Roger Keys. All audio rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
