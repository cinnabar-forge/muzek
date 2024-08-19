import db from "$lib/server/database";
import type { Folder } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const musicFiles = await db<Folder>("music_files").where(
    "folder_id",
    params.folder,
  );

  return {
    title: params.folder,
    content: musicFiles.length,
  };
};
