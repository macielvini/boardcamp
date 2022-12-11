import { customerSchema } from "../models/customers.schema.js";
import { connection } from "../server.js";

export const validateCustomerSchema = async (req, res, next) => {
  const { body } = req;

  const { error } = customerSchema.validate(body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(400).send({ message: errors });
  }

  next();
};

export const validateCustomerCpf = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;

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

export const findCustomerId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const customer = await connection.query(
      `
    SELECT * 
    FROM customers 
    WHERE id=$1
    `,
      [id]
    );

    if (!customer.rowCount) return res.sendStatus(404);

    req.customer = customer.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const findCustomerCpf = async (req, res, next) => {
  const { cpf } = req.query;

  try {
    const customer = await connection.query(
      `
    SELECT * 
    FROM customers 
    WHERE cpf LIKE $1;
    `,
      [`${cpf}%`]
    );

    if (!customer.rowCount) res.sendStatus(404);

    req.customer = customer.rows;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
