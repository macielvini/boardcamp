import { customerSchema } from "../models/customers.schema.js";
import { connection } from "../server.js";

export const validateCustomers = async (req, res, next) => {
  const { body } = req;
  const { error } = customerSchema.validate(body, { abortEarly: false });

  console.log(body);

  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(400).send({ message: errors });
  }

  try {
    const customer = await connection.query(
      `
    SELECT name 
    FROM customers 
    WHERE cpf=$1`,
      [body.cpf]
    );

    if (customer.rowCount)
      return res.status(409).send({ message: "cpf already registered" });

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
