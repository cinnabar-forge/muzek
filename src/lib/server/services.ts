import db from "$lib/server/database";
import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";
import pkg from "node-id3";
const NodeID3 = pkg.Promise;
import { createHash } from "crypto";
import type { Folder, MusicFile } from "$lib/types";
import { getFileNameFromData } from "$lib/display-name";
import { loadableAudioFormats } from "$lib/variables";

async function getFolderData(folderHash: string) {
  const folderData = await db<Folder>("folders")
    .where("hash", folderHash)
    .first();
  return folderData;
}

async function getAllFiles(
  dir: string,
  fileList: string[] = [],
): Promise<string[]> {
  const files = await fs.promises.readdir(dir);
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

  const musicFiles = allFiles.filter((file) =>
    loadableAudioFormats.some((format) => file.endsWith("." + format)),
  );

  const repeatHashes: Record<string, true> = {};

  let progress = 0;
  for (const file of musicFiles) {
    progress++;
    console.log(
      "processing file",
      progress,
      "of",
      musicFiles.length,
      "[",
      file,
      "]",
    );
    try {
      const fileContents = await fs.promises.readFile(file);
      const metadata = await parseFile(file);
      const filePath = file.split(folderPath)[1];
      const fileExtension = filePath.split(".").pop() || ".unknown";
      const fileHash = createHash("sha256")
        .update(fileContents)
        .digest("hex")
        .slice(0, 12);
      if (repeatHashes[fileHash]) {
        await fs.promises.rm(file);
        console.log("deleted duplicated path", file);
        continue;
      } else {
        repeatHashes[fileHash] = true;
      }
      const provisionalPath = getFileNameFromData(
        metadata.common.artist,
        metadata.common.album,
        metadata.common.track.no,
        metadata.common.title,
        fileExtension,
        fileHash,
      );
      await db<MusicFile>("music_files").insert({
        original_path: filePath,
        extension: fileExtension,
        folder: folderHash,
        hash: fileHash,
        title: metadata.common.title,
        artist: metadata.common.artist,
        album: metadata.common.album,
        track_number: metadata.common.track.no,
        genre: metadata.common.genre ? metadata.common.genre[0] : "",
        year: metadata.common.year,
        provisional_path: provisionalPath,
      });
    } catch {
      console.log("failed to process", file);
    }
  }
}

async function reloadFolder(folderHash: string) {
  console.log("Reloading folder", folderHash);
  const folderData = await getFolderData(folderHash);

  if (!folderData) {
    return;
  }

  await db<MusicFile>("music_files").where("folder", folderHash).delete();

  await processMusicFiles(folderData.path, folderHash);
  console.log("Folder reloaded:", folderHash);
}

async function saveFolder(folderHash: string) {
  console.log("Saving folder", folderHash);

  const repeatPaths: Record<string, true> = {};

  const folderData = await getFolderData(folderHash);

  if (!folderData) {
    return;
  }

  const musicFilesData = await db<MusicFile>("music_files")
    .where("folder", folderHash)
    .where("resave_file", true)
    .orWhereNot("provisional_path", "original_path");

  for (const musicFileData of musicFilesData) {
    const originalFile = path.join(
      folderData.path,
      musicFileData.original_path,
    );
    const provisionalPath = path.join(
      folderData.path,
      musicFileData.provisional_path,
    );

    const isSameFile = originalFile === provisionalPath;

    const isEditing = musicFileData.resave_file || !isSameFile;

    if (!isEditing) {
      continue;
    }

    if (repeatPaths[provisionalPath]) {
      console.log("skipping", originalFile, "(duplicated path)");
      continue;
    }

    if (isSameFile) {
      console.log("editing", originalFile);
    } else {
      console.log(
        musicFileData.resave_file ? "editing" : "moving",
        originalFile,
        ">",
        provisionalPath,
      );
    }
    try {
      await fs.promises.mkdir(path.dirname(provisionalPath), {
        recursive: true,
      });

      const fileContents = await fs.promises.readFile(originalFile);

      if (musicFileData.resave_file) {
        const metadata = {
          title: musicFileData.title || undefined,
          artist: musicFileData.artist || undefined,
          album: musicFileData.album || undefined,
          trackNumber: musicFileData.track_number?.toString() || undefined,
          genre: musicFileData.genre || undefined,
          year: musicFileData.year || undefined,
        };

        const updatedFileContents = await NodeID3.update(
          metadata,
          fileContents,
        );

        await fs.promises.writeFile(provisionalPath, updatedFileContents);
        repeatPaths[provisionalPath] = true;
        if (!isSameFile) {
          await fs.promises.rm(originalFile);
        }
      } else if (!isSameFile) {
        await fs.promises.cp(originalFile, provisionalPath);
        repeatPaths[provisionalPath] = true;
        await fs.promises.rm(originalFile);
      }
    } catch {
      console.log("failed to change", originalFile);
    }
  }
  console.log("Folder saved:", folderHash);

  await reloadFolder(folderHash);
}

export { getFolderData, reloadFolder, saveFolder };
