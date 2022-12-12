import { rentalSchema } from "../models/rentals.schema.js";
import { connection } from "../server.js";

export const validateRentalSchema = async (req, res, next) => {
  const { body } = req;

  const { error } = rentalSchema.validate(body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(400).send({ message: errors });
  }

  next();
};

export const validateCloseRental = async (req, res, next) => {
  const { id } = req.params;

  try {
    const rental = await connection.query(
      `
    SELECT *
    FROM rentals
    WHERE id=$1
    `,
      [id]
    );

    if (!rental.rowCount) {
      return res.status(404).send({ message: "rental id not found" });
    }

    if (rental.rows[0].returnDate) {
      return res.status(400).send({ message: "this rental is already closed" });
    }

    req.rental = rental.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const validateDeleteRental = async (req, res, next) => {
  const { id } = req.params;

  try {
    const rental = await connection.query(
      `
    SELECT *
    FROM rentals
    WHERE id=$1
    `,
      [id]
    );

    if (!rental.rowCount) {
      return res.status(404).send({ message: "rental id not found" });
    }

    if (!rental.rows[0].returnDate) {
      return res.status(400).send({ message: "rental is not closed yet" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const validateRental = async (req, res, next) => {
  const { customerId, gameId, daysRented } = req.body;

  if (!daysRented) {
    return res
      .status(400)
      .send({ message: "can not rent for less than one day" });
  }

  try {
    const customer = await connection.query(
      `
      SELECT *
      FROM customers
      WHERE id=$1
    `,
      [customerId]
    );

    if (!customer.rowCount) {
      return res.status(400).send({ message: "user id not found" });
    }

    const game = await connection.query(
      `
      SELECT *
      FROM games
      WHERE id=$1
    `,
      [gameId]
    );

    if (!game.rowCount) {
      return res.status(400).send({ message: "game id not found" });
    }

    const { stockTotal } = game.rows[0];
    const totalRentals = await connection.query(
      `
      SELECT *
      FROM rentals
      WHERE "gameId"=$1
    `,
      [gameId]
    );

    if (totalRentals >= stockTotal) {
      return res.status(400).send({ message: "game out of stock" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
