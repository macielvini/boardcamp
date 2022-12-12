import dayjs from "dayjs";
import { connection } from "../server.js";

export const insertRental = async (req, res) => {
  try {
    const { customerId, gameId, daysRented } = req.body;

    const rentDate = dayjs().format("YYYY-MM-DD");

    const gameInfo = await connection.query(
      `
      SELECT "pricePerDay"
      FROM games
      WHERE id=$1
    `,
      [gameId]
    );

    const { pricePerDay } = gameInfo.rows[0];

    await connection.query(
      `
      INSERT INTO rentals
      ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        null,
        pricePerDay * daysRented,
        null,
      ]
    );

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getRentals = async () => {
  try {
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const closeRental = async (req, res) => {
  const { id } = req.params;
  const { rental } = req;

  const date = dayjs().format("YYYY-MM-DD");
  const rentDiff = dayjs(date).diff(rental.rentDate, "day");
  const delay = rentDiff - rental.daysRented > 0 ? rentDiff : null;

  try {
    await connection.query(
      `
    UPDATE rentals
    SET "returnDate"=$1, "delayFee"=("originalPrice"/"daysRented")*$2
    WHERE id=$3
    `,
      [date, rentDiff, id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRental = async (req, res) => {
  const { id } = req.params;

  try {
    await connection.query(`DELETE FROM rentals WHERE id=$1`, [id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
