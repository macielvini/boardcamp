import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./server.js";

import categoriesRouter from "./routes/categories.router.js";
import gamesRouter from "./routes/games.router.js";
import customersRouter from "./routes/customers.router.js";
import rentalsRouter from "./routes/rentals.router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.listen(4000, () => console.log("Server running in port 4000"));
