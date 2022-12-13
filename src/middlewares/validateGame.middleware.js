import { connection } from "../server.js";
import { gameSchema } from "../models/games.schema.js";

export const validateGame = async (req, res, next) => {
  const { body } = req;

  const { error } = gameSchema.validate(body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(400).send({ message: errors });
  }

  try {
    const categoryIdExist = await connection.query(
      "SELECT * FROM categories WHERE id=$1",
      [body.categoryId]
    );

    if (!categoryIdExist.rowCount)
      return res.status(400).send({ message: "categoryId does not exist" });

    const gameExist = await connection.query(
      "SELECT * FROM games WHERE name=$1",
      [body.name]
    );

    if (gameExist.rowCount)
      return res.status(409).send({ message: "game already listed" });

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
