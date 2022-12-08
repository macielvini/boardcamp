import { connection } from "../server.js";

export const insertCategory = async (req, res) => {
  const name = req.body.name;

  try {
    await connection.query("INSERT INTO categories (name) VALUES ($1);", [
      name,
    ]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await connection.query("SELECT * FROM categories");
    res.status(200).send(categories.rows);
  } catch (error) {
    console.log(error);
  }
};
