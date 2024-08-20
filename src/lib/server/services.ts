import db from "$lib/server/database";
import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";
import { createHash } from "crypto";
import type { Folder, MusicFile } from "$lib/types";
import { getFileNameFromData } from "$lib/display-name";

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
    const filePath = file.split(folderPath)[1];
    const fileHash = createHash("sha256")
      .update(filePath)
      .digest("hex")
      .slice(0, 12);
    await db<MusicFile>("music_files").insert({
      original_path: filePath,
      folder: folderHash,
      hash: fileHash,
      title: metadata.common.title,
      artist: metadata.common.artist,
      album: metadata.common.album,
      track_number: metadata.common.track.no,
      genre: metadata.common.genre ? metadata.common.genre[0] : "",
      year: metadata.common.year,
      provisional_path: getFileNameFromData(
        metadata.common.artist,
        metadata.common.album,
        metadata.common.track.no,
        metadata.common.title,
      ),
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
