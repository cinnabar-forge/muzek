import db from "$lib/server/database";
import fs from "fs";
import type { Folder } from "$lib/types";
import path from "path";
import type { Actions, PageServerLoad } from "./$types";
import { createHash } from "crypto";
import { reloadFolder } from "$lib/server/services";

export const load: PageServerLoad = async () => {
  const folders = await db<Folder>("folders");

  return {
    folders,
  };
};

export const actions = {
  "load-folder": async ({ request }) => {
    const data = await request.formData();
    const folderName = data.get("folder-name");

    if (!folderName || !fs.existsSync(folderName.toString())) {
      return;
    }

    const resolvedPath = path.resolve(folderName.toString());

    const folderHash = createHash("sha256")
      .update(resolvedPath)
      .digest("hex")
      .slice(0, 12);

    await db<Folder>("folders").insert([
      {
        path: resolvedPath,
        hash: folderHash,
      },
    ]);

    reloadFolder(folderHash);
  },
} satisfies Actions;
