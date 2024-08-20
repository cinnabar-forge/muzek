export interface Folder {
  hash: string;
  path: string;
}

export interface MusicFile {
  original_path: string;
  extension: string;
  folder: string;
  hash: string;
  title?: null | string;
  artist?: null | string;
  album?: null | string;
  year?: null | string;
  track_number?: null | number;
  genre?: null | string;
  provisional_path: string;
  resave_file?: boolean;
}

export interface MusicPlayer {
  file: null | string;
  text: null | string;
}
