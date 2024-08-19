export function getFileNameFromData(
  artist: null | string,
  album: null | string,
  trackNumber: null | number,
  title: null | string,
): string {
  const artistDir = artist ? artist : 'Unknown Artist';
  const albumDir = album ? album : 'Unknown Album';
  const track = trackNumber != null ? trackNumber.toString().padStart(2, '0') : '00';
  const trackTitle = title ? title : 'Unknown Title';

  const provisionalPath = `${artistDir}/${albumDir}/${track} - ${trackTitle}.mp3`;

  return provisionalPath;
}