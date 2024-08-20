import db from "$lib/server/database";
import type { MusicFile } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getFileNameFromData } from "$lib/display-name";

export const load: PageServerLoad = async ({ params }) => {
  const musicFileData = await db<MusicFile>("music_files")
    .where("hash", params.file)
    .first();

  if (!musicFileData) {
    error(404, {
      message: "Not found",
    });
  }

  return {
    musicFileData,
  };
};

export const actions = {
  "update-music-file": async ({ params, request }) => {
    const data = await request.formData();
    const title = data.get("title")?.toString() || null;
    const artist = data.get("artist")?.toString() || null;
    const album = data.get("album")?.toString() || null;
    const track_number = Number(data.get("track_number")) || null;
    const genre = data.get("genre")?.toString() || null;
    const year = data.get("year")?.toString() || null;

    // const folderName = ;
    await db<MusicFile>("music_files")
      .update({
        title,
        artist,
        album,
        track_number,
        genre,
        year,
        provisional_path: getFileNameFromData(
          artist,
          album,
          track_number,
          title,
        ),
      })
      .where("hash", params.file);
  },
} satisfies Actions;
