import knex from "knex";
import knexConfig from "../../../knexfile";

export default knex({
  client: knexConfig.development.client,
  connection: {
    filename: knexConfig.development.connection.filename,
  },
  useNullAsDefault: true,
});
