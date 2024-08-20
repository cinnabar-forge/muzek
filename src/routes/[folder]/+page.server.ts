import db from "$lib/server/database";
import type { Folder } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { reloadFolder, saveFolder } from "$lib/server/services";

export const load: PageServerLoad = async ({ params }) => {
  const folderData = await db<Folder>("folders")
    .where("hash", params.folder)
    .first();

  if (!folderData) {
    error(404, {
      message: "Not found",
    });
  }

  return {
    folderName: folderData?.path,
  };
};

export const actions = {
  "reload-folder": async (event) => {
    await reloadFolder(event.params.folder);
  },
  "save-structure": async (event) => {
    await saveFolder(event.params.folder);
  },
} satisfies Actions;
