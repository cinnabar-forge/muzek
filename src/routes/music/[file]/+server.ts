import db from "$lib/server/database";
import fs from "fs";
import path from "path";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { MusicFile } from "$lib/types";

export const GET: RequestHandler = async ({ params }) => {
  const musicFileData = await db("music_files")
    .join("folders", "music_files.folder", "folders.hash")
    .where("music_files.hash", params.file)
    .first();

  if (!musicFileData) {
    error(404, {
      message: "Not found",
    });
  }

  console.log(musicFileData);

  const fullFilePath = path.join(
    musicFileData.path,
    musicFileData.original_path,
  );

  const fileContent = fs.readFileSync(fullFilePath);

  return new Response(fileContent);
};
