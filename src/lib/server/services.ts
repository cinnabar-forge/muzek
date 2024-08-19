import db from "$lib/server/database";
import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";
import type { Folder, MusicFile } from "$lib/types";

async function getAllFiles(
  dir: string,
  fileList: string[] = [],
): Promise<string[]> {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      await getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function processMusicFiles(folderPath: string, folderHash: string) {
  const allFiles = await getAllFiles(folderPath);
  const musicFiles = allFiles.filter(
    (file) => file.endsWith(".mp3") || file.endsWith(".wav"),
  );

  for (const file of musicFiles) {
    const metadata = await parseFile(file);
    await db<MusicFile>("music_files").insert({
      original_path: file.split(folderPath)[1],
      folder: folderHash,
      title: metadata.common.title || path.basename(file),
      artist: metadata.common.artist,
      album: metadata.common.album,
      track_number: metadata.common.track.no,
      genre: metadata.common.genre ? metadata.common.genre[0] : "",
      year: metadata.common.year,
    });
  }
}

async function reloadFolder(folderHash: string) {
  const folderData = await db<Folder>("folders")
    .where("hash", folderHash)
    .first();

  if (!folderData) {
    return;
  }

  await db<Folder>("music_files").where("folder", folderHash).delete();

  await processMusicFiles(folderData.path, folderHash);

  console.log("reloadFolder", folderData);
}

export { reloadFolder };
