import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./server.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", async (req, res) => {
  const result = await connection.query("SELECT * FROM ");
  res.send("Hello");
});

app.post("/categories", async (req, res) => {
  const name = req.body?.name;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const exist = await connection.query(
      "SELECT * FROM categories WHERE name=$1",
      [name]
    );

    if (exist.rowCount) return res.sendStatus(409);

    await connection.query("INSERT INTO categories (name) VALUES ($1);", [
      name,
    ]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await connection.query("SELECT * FROM categories");
    res.status(200).send(categories.rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => console.log("Server running in port 4000"));
