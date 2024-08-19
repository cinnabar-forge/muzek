import "dotenv/config";
import fs from "fs";
import os from "os";
import path from "path";

const DATABASE_DIR =
  (process.env.DB_PATH && path.resolve(process.env.DB_PATH)) ||
  path.resolve(os.homedir(), ".config", "cinnabar-forge", "muzek");

console.log(DATABASE_DIR);
fs.mkdirSync(DATABASE_DIR, { recursive: true });

const knexConfig = {
  client: "better-sqlite3",
  connection: {
    filename: path.resolve(DATABASE_DIR, "muzek.sqlite"),
  },
  migrations: {
    directory: "./migrations",
    loadExtensions: [".js"],
    tableName: "cinnabar_migrations",
  },
  useNullAsDefault: true,
};

export default {
  development: knexConfig,
  testing: knexConfig,
  production: knexConfig,
};
