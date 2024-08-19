/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable("folders", (table) => {
    table.string("hash").primary();
    table.string("path").notNullable().unique();
    table.timestamps(true, true);
  });

  await knex.schema.createTable("music_files", (table) => {
    table.string("original_path").primary().notNullable();
    table.string("folder").notNullable();
    table.string("hash").notNullable();
    table.string("title");
    table.string("artist");
    table.string("album");
    table.string("year");
    table.integer("track_number");
    table.string("genre");
    table.string("provisional_path").notNullable();
    table.boolean("resave_file");
    table.timestamps(true, true);
    table
      .foreign("folder")
      .references("hash")
      .inTable("folders")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists("music_files");
  await knex.schema.dropTableIfExists("folders");
};
