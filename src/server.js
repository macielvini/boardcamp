import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pg;

export const connection = new Pool({
  host: process.env.HOST,
  port: process.env.PSQL_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "boardcamp",
});
