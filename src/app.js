import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

// const { Pool } = new Pool({
//   host: process.env.HOST,
//   port: 5432,
//   user: "postgres",
//   password: "aimeudeus",
//   database: "boardcamp",
// });

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(4000, () => console.log("Server running in port 4000"));
