/*
  # Create audio_files table

  1. New Tables
    - `audio_files`
      - `id` (uuid, primary key) - Unique identifier for each audio file
      - `title` (text) - Title of the audio file
      - `brand` (text) - Brand name (e.g., RogarTach)
      - `category` (text) - Category of the audio file
      - `description` (text) - Description of the audio file
      - `file_type` (text) - Type of file (aus or sty)
      - `cloudinary_image_url` (text) - URL to the image on Cloudinary
      - `cloudinary_audio_url` (text) - URL to the audio file on Cloudinary
      - `duration` (integer) - Duration of audio in seconds (optional)
      - `file_size` (text) - Size of the file (optional)
      - `is_new` (boolean) - Whether the file is marked as new
      - `created_at` (timestamptz) - Timestamp when the record was created

  2. Security
    - Enable RLS on `audio_files` table
    - Add policy for public read access (anyone can view audio files)
*/

CREATE TABLE IF NOT EXISTS audio_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  file_type text NOT NULL CHECK (file_type IN ('aus', 'sty')),
  cloudinary_image_url text NOT NULL,
  cloudinary_audio_url text NOT NULL,
  duration integer,
  file_size text,
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audio_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view audio files"
  ON audio_files
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert audio files"
  ON audio_files
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update audio files"
  ON audio_files
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete audio files"
  ON audio_files
  FOR DELETE
  TO authenticated
  USING (true);