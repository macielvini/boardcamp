import { Router } from "express";
import { insertCustomer } from "../controllers/customers.controller.js";
import { validateCustomers } from "../middlewares/validateCustomers.middleware.js";

const router = Router();

router.post("/customers", validateCustomers, insertCustomer);

export default router;
