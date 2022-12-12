import { connection } from "../server.js";

export const insertGame = async (req, res) => {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getGames = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const games = await connection.query(
        "SELECT * FROM games WHERE LOWER(name) LIKE $1",
        [`%${name}%`]
      );
      return res.send(games.rows);
    }

    const games = await connection.query("SELECT * FROM games");
    res.send(games.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
