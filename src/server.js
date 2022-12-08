import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

// export const connection = new Pool({
//   host: process.env.HOST,
//   port: process.env.PSQL_PORT,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: "boardcamp",
// });
export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});
