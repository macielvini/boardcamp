import { connection } from "../server.js";

export const getCustomers = async (req, res) => {
  const { customer } = req;
  const offset = req.query.offset ? req.query.offset : null;
  const limit = req.query.limit ? req.query.limit : null;

  try {
    if (customer) {
      return res.send(customer);
    }

    const customers = await connection.query(
      "SELECT * FROM customers LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    res.send(customers.rows.reverse());
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const insertCustomer = async (req, res) => {
  const { name, phone, cpf, birthday } = req.body;
  try {
    await connection.query(
      `
    INSERT INTO customers
    (name, phone, cpf, birthday)
    VALUES ($1, $2, $3, $4)
    `,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const updateCustomer = async (req, res) => {
  const { customer } = req;
  const { name, phone, cpf, birthday } = req.body;
  try {
    await connection.query(
      `
    UPDATE customers 
    SET name=$1, phone=$2, cpf=$3, birthday=$4
    WHERE id=$5`,
      [name, phone, cpf, birthday, customer.id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
