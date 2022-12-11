import { Router } from "express";
import {
  getCustomers,
  insertCustomer,
  updateCustomer,
} from "../controllers/customers.controller.js";
import {
  findCustomerCpf,
  findCustomerId,
  validateCustomerCpf,
  validateCustomerSchema,
} from "../middlewares/validateCustomers.middleware.js";

const router = Router();

router.get("/customers/:id", findCustomerId, getCustomers);
router.get("/customers", findCustomerCpf, getCustomers);

router.use(validateCustomerSchema);
router.post("/customers", validateCustomerCpf, insertCustomer);
router.patch("/customers/:id", findCustomerId, updateCustomer);

export default router;
