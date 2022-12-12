import { Router } from "express";
import {
  closeRental,
  deleteRental,
  getRentals,
  insertRental,
} from "../controllers/rentals.controller.js";
import {
  validateCloseRental,
  validateDeleteRental,
  validateRental,
  validateRentalSchema,
} from "../middlewares/validateRentals.middleware.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateRentalSchema, validateRental, insertRental);
router.post("/rentals/:id/return", validateCloseRental, closeRental);

router.delete("/rentals/:id", validateDeleteRental, deleteRental);

export default router;
