export interface Folder {
  hash: string;
  path: string;
}

export interface MusicFile {
  original_path: string;
  folder: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  track_number: number;
  genre: string;
  provisional_path: string;
}
