import { db } from "@repo/middlewares/database";
import { type Request, type Response } from "express";
import { Food } from "../models/food.model";

export const fetchFoods = async(req: Request, res: Response) => {
  try {
    const foods = await db.query(`SELECT * FROM foods`);
    res.status(200).json({
      "message": "Success",
      "data": foods.rows
    });
  } catch (error) {
    console.error("Error fetching foods", error);
    res.status(500).send({ message: "Error fetching foods from the database" });
  }
};

export const getFoodById = async(req: Request, res: Response) => {
  const food_id = req.params.food_id;
  try {
    const food = await db.query(`SELECT * FROM foods WHERE id = $1`, [food_id]);
    res.status(200).json({
      "message": "Success",
      "data": food.rows[0]
    });
  } catch (error) {
    console.error("Error getting food", error);
    res.status(500).send({ message: "Error getting food detail from the database" });
  }
};

export const createFood = async(req: Request, res: Response) => {
  const { name, description, price, image, restaurant_id }: Food = req.body;

  try {
    const food = await db.query(`
      INSERT INTO foods (name, description, price, image, restaurant_id) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [name, description, price, image, restaurant_id]);
    
    res.status(201).json({
      message: "Food added successfully",
      data: food.rows[0]
    });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).send({ message: "Error adding food to the database" });
  }
};

export const updateFood = async(req: Request, res: Response) => {
    const food_id = req.params.food_id;
    const { name, description, price, image, restaurant_id}: Food = req.body;

    try {
      const food = await db.query(`
      UPDATE foods set
          name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          image = COALESCE($4, image),
          restaurant_id = COALESCE($5, image)
      WHERE id = $6 RETURNING *`,
      [name, description, price, image, restaurant_id, food_id]);
      
      res.status(200).json({
        message: "Food updated",
        data: food.rows[0]
      });
    } catch (error) {
      console.error("Error updating food", error);
      res.status(500).send({ message: "Error updating food to the database" });
    }
};

export const deleteFood = async (req: Request, res: Response) => {
  const food_id = req.params.food_id;
  try {
    const food = await db.query(`
      DELETE FROM foods
      WHERE id = $1 RETURNING *
      `, [food_id]);

    res.status(200).json({
      message: "Food deleted",
      data: food.rows[0]
    });
  } catch (error) {
    console.error("Error deleting food", error);
    res.status(500).send({ message: "Error deleting food from the database" });
  }
};



