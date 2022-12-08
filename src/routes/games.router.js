import { Router } from "express";
import { insertGame } from "../controllers/games.controller.js";
import { validateGame } from "../middlewares/validateGame.middleware.js";

const router = Router();

router.post("/games", validateGame, insertGame);

export default router;
