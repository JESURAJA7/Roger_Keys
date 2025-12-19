# ROGERKEYS - Audio & Style Library

A beautiful audio and style library application with white and pink glassmorphism design. Browse, preview, and download professional audio files and synthesizer styles.

## Features

- White and pink glassmorphism UI design
- Piano keyboard banner with glass effect
- Audio file library with search and filters
- File detail pages with user profiles
- Responsive design
- Audio playback for .aus files
- Download functionality

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Database)
- Lucide React (Icons)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the migration in `supabase/migrations/20250101000000_create_audio_files_table.sql`
   - Add your Supabase URL and anon key to the `.env` file

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Database Schema

The application uses a single `audio_files` table with the following structure:

- `id`: Unique identifier
- `title`: File title
- `brand`: Brand name
- `category`: File category
- `description`: File description
- `file_type`: Either 'aus' (audio) or 'sty' (style)
- `cloudinary_image_url`: Cover image URL
- `cloudinary_audio_url`: Audio file URL
- `duration`: Duration in seconds (optional)
- `file_size`: File size string (optional)
- `is_new`: New badge flag
- `created_at`: Creation timestamp

## Design Features

- Light background with soft pink gradient
- Glassmorphism effects with backdrop blur
- Pink accent colors throughout
- Smooth hover transitions
- Responsive grid layouts
- Clean, modern typography
