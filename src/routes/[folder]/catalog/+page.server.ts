import db from "$lib/server/database";
import type { MusicFile } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const musicFilesData = await db<MusicFile>("music_files")
    .where("folder", params.folder)
    .orderBy("artist")
    .orderBy("album")
    .orderBy("track_number")
    .orderBy("title");

  return {
    files: musicFilesData,
  };
};
