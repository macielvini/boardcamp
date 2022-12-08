import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./server.js";

import categoriesRouter from "./routes/categories.router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoriesRouter);

app.get("/", async (req, res) => {
  const result = await connection.query("SELECT * FROM ");
  res.send("Hello");
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
