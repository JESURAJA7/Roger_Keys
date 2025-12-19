import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Header from './components/Header';

const AdminPanel = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) return;

        setLoading(true);
        setStatus('idle');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5055/api/tracks', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Track uploaded successfully!');
                setTitle('');
                setFile(null);
                // Clear file input manually if needed
            } else {
                throw new Error('Upload failed');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Failed to upload track. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />

            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-pink-100 rounded-lg text-pink-600">
                            <Upload size={24} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                    </div>

                    <form onSubmit={handleUpload} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Track Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter track name..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Audio File (.aus, .au, .mp3, etc.)
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !file || !title}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 active:scale-[0.98]'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={20} />
                                    Upload Track
                                </>
                            )}
                        </button>
                    </form>

                    {status !== 'idle' && (
                        <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${status === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                            }`}>
                            {status === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <p className="font-medium">{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
