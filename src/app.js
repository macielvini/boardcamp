import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./server.js";

import categoriesRouter from "../routes/categories.router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoriesRouter);

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

app.post("/games", async (req, res) => {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(202);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(4000, () => console.log("Server running in port 4000"));
