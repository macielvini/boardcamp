import { Router } from "express";
import {
  getCustomers,
  insertCustomer,
} from "../controllers/customers.controller.js";
import {
  findCustomerCpf,
  findCustomerId,
  validateCustomers,
} from "../middlewares/validateCustomers.middleware.js";

const router = Router();

router.post("/customers", validateCustomers, insertCustomer);
router.get("/customers/:id", findCustomerId, getCustomers);
router.get("/customers", findCustomerCpf, getCustomers);

export default router;
