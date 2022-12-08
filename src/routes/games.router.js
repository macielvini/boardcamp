import { Router } from "express";
import { getGames, insertGame } from "../controllers/games.controller.js";
import { validateGame } from "../middlewares/validateGame.middleware.js";

const router = Router();

router.post("/games", validateGame, insertGame);
router.get("/games", getGames);

export default router;
