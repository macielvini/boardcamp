import { Router } from "express";
import { insertRental } from "../controllers/rentals.controller.js";
import {
  validateRental,
  validateRentalSchema,
} from "../middlewares/validateRentals.middleware.js";

const router = Router();

router.post("/rentals", validateRentalSchema, validateRental, insertRental);

export default router;
