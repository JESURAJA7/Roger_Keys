export interface AudioFile {
  id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  file_type: 'aus' | 'sty';
  cloudinary_image_url: string;
  cloudinary_audio_url: string;
  duration?: number;
  file_size?: string;
  is_new?: boolean;
  created_at: string;
}

export type FileType = 'all' | 'aus' | 'sty';

export enum ProductCategory {
  Synthesizers = "Synthesizers",
  Modules = "Modules",
  Keyboards = "Keyboards",
  Accessories = "Accessories",
  Parts = "Parts"
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: ProductCategory | string;
  description: string;
  stock: number;
  isNew: boolean;
  specs: Record<string, string>;
}


export interface AudioTrack {
  id: string;
  title: string;
  url: string;
}
