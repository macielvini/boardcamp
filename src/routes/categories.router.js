import { Router } from "express";
import {
  getCategories,
  insertCategory,
} from "../controllers/categories.controller.js";
import { validateCategories } from "../middlewares/validateCategories.middleware.js";
import { connection } from "../server.js";

const router = Router();

router.post("/categories", validateCategories, insertCategory);

router.get("/categories", getCategories);

export default router;
