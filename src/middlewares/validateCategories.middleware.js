import { connection } from "../server.js";

export const validateCategories = async (req, res, next) => {
  const { body } = req;

  if (!body.name) return res.sendStatus(400);

  try {
    const exist = await connection.query(
      "SELECT * FROM categories WHERE name=$1",
      [body.name]
    );

    if (exist.rowCount) return res.sendStatus(409);

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
