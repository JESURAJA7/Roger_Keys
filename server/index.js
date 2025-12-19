import express from 'express';
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
        const tracks = await Track.find().sort({ created_at: -1 });
        res.json(tracks);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
