export interface Folder {
  id: number;
  path: string;
}

export interface MusicFile {
  original_path: string;
  folder_id: number;
  title: string;
  artist: string;
  album: string;
  year: string;
  trackNumber: number;
  genre: string;
  provisionalPath: string;
}
