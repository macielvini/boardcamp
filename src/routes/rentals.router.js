import { Router } from "express";
import {
  closeRental,
  getRentals,
  insertRental,
} from "../controllers/rentals.controller.js";
import {
  validateCloseRental,
  validateRental,
  validateRentalSchema,
} from "../middlewares/validateRentals.middleware.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateRentalSchema, validateRental, insertRental);
router.post("/rentals/:id/return", validateCloseRental, closeRental);

export default router;
