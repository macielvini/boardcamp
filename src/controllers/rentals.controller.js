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