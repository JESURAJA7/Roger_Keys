import express from 'express';
import { promises as fs } from 'fs';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import Track from './models/Track.js';
import Subscriber from './models/Subscriber.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage Config
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'rojer-keys',
        resource_type: 'raw', // Important for .aus files
    },
});

const upload = multer({ storage: storage });

// Routes
app.get('/api/tracks', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const totalTracks = await Track.countDocuments();
        const totalPages = Math.ceil(totalTracks / limit);

        const tracks = await Track.find()
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            tracks,
            currentPage: page,
            totalPages,
            totalTracks
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/local-files', async (req, res) => {
    try {
        const audioDir = path.join(__dirname, '../public/Audio');
        const mode = req.query.mode || 'folders'; // 'folders' or 'files'
        const folderName = req.query.folderName;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        // Check if directory exists
        try {
            await fs.access(audioDir);
        } catch {
            return res.status(404).json({ error: 'Audio directory not found' });
        }

        if (mode === 'folders') {
            const entries = await fs.readdir(audioDir, { withFileTypes: true });
            const allFolders = entries
                .filter(entry => entry.isDirectory())
                .map(entry => entry.name);

            const totalFolders = allFolders.length;
            const totalPages = Math.ceil(totalFolders / limit);
            const paginatedFolders = allFolders.slice(skip, skip + limit);

            // For folders view, we just return names and file counts (optional, expensive if recursive)
            // Simplified to just names and basic file count if needed, or just names
            const foldersWithCounts = await Promise.all(paginatedFolders.map(async (name) => {
                const folderPath = path.join(audioDir, name);
                const files = await fs.readdir(folderPath);
                const styFiles = files.filter(file => file.toLowerCase().endsWith('.sty') || file.toLowerCase().endsWith('.aus'));
                return {
                    name: name,
                    fileCount: styFiles.length
                };
            }));

            res.json({
                folders: foldersWithCounts,
                currentPage: page,
                totalPages,
                totalFolders
            });

        } else if (mode === 'files') {
            if (!folderName) {
                return res.status(400).json({ error: 'Folder name required for files mode' });
            }

            const folderPath = path.join(audioDir, folderName);
            // Security check to prevent directory traversal
            if (!folderPath.startsWith(audioDir)) {
                return res.status(403).json({ error: 'Invalid folder path' });
            }

            try {
                await fs.access(folderPath);
            } catch {
                return res.status(404).json({ error: 'Folder not found' });
            }

            const files = await fs.readdir(folderPath);
            const styFiles = files.filter(file => file.toLowerCase().endsWith('.sty') || file.toLowerCase().endsWith('.aus'));

            const totalFiles = styFiles.length;
            const totalPages = Math.ceil(totalFiles / limit);
            const paginatedFiles = styFiles.slice(skip, skip + limit);

            res.json({
                files: paginatedFiles,
                currentPage: page,
                totalPages,
                totalFiles
            });
        } else {
            res.status(400).json({ error: 'Invalid mode' });
        }

    } catch (err) {
        console.error('Error reading local files:', err);
        res.status(500).json({ error: 'Failed to read local files' });
    }
});


app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if duplicate
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(200).json({ message: 'Already subscribed' });
        }

        const subscriber = new Subscriber({ email });
        await subscriber.save();
        res.status(201).json({ message: 'Subscribed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/tracks', upload.single('file'), async (req, res) => {
    try {
        const { title } = req.body;
        const track = new Track({
            title,
            url: req.file.path,
            cloudinary_id: req.file.filename,
        });
        await track.save();
        res.status(201).json(track);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MongoDB Connection
const PORT = process.env.PORT || 5055;
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
