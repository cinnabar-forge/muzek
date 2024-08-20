export function getFileNameFromData(
  artist: null | string,
  album: null | string,
  trackNumber: null | number,
  title: null | string,
  extension: string,
  hash: string,
): string {
  const artistDir = artist ? artist : "Unknown Artist";
  const albumDir = album ? album : "Unknown Album";
  const track = trackNumber != null && trackNumber.toString().padStart(2, "0");
  const trackTitle = title ? title : hash;

  const provisionalPathPart = `/${artistDir}/${albumDir}`;

  const provisionalNamePart = track
    ? `/${track} - ${trackTitle}.${extension}`
    : `/${trackTitle}.${extension}`;

  const provisionalPath = provisionalPathPart + provisionalNamePart;

  return provisionalPath;
}

export function getDisplayNameFromData(
  hash: string,
  title: null | string | undefined,
  artist: null | string | undefined,
  album: null | string | undefined,
  year: null | string | undefined,
): string {
  let displayName = title ? title : hash;

  if (artist) {
    displayName += " - " + artist;
  }

  if (album || year) {
    displayName += " (";
    if (album) {
      displayName += album;
      if (year) {
        displayName += ", ";
      }
    }

    if (year) {
      displayName += Number(year);
    }

    displayName += ")";
  }

  return displayName;
}
