import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { db } from "@repo/middlewares/database";
import { Food } from "../models/food.model";

export const fetchRestaurants =async (req: Request, res: Response) => {
    try {
      const restaurants = await db.query("SELECT * FROM restaurants");
      res.status(200).json({
        "message": "Success",
        "data": restaurants.rows
      });
    } catch (error) {
        console.error("Error fetching restaurant", error);
        res.status(500).send({ message: "Error fetching restaurant from the database" });
    }
};

export const getRestaurantById =async (req: Request, res: Response) => {
    const restaurant_id = req.params.restaurant_id;
    try {
        const restaurant = await db.query(`
          SELECT r.id AS restaurant_id, 
                 r.name AS restaurant_name, 
                 r.address, 
                 r.phone_number, 
                 r.rating, 
                 r.open_time, 
                 r.close_time, f.* FROM restaurants r LEFT JOIN foods f ON r.id = f.restaurant_id WHERE r.id = $1  
        `, [restaurant_id]);

        if (restaurant.rowCount === 0){
            return res.status(404).send({
                message: `There is no restaurant with ID ${restaurant_id}`
            });
        }

        const foods: Food[] = [];
        // Group food items by restaurant
        restaurant.rows.forEach(row => {
            let food: Food = {
              "id": row.id,
              "name": row.name,
              "description": row.description,
              "price": row.price,
              "image": row.image
            }
            foods.push(food)
        });

        res.status(200).json({
            "message": "Success",
            "data": {
              id: restaurant.rows[0].restaurant_id,
              name: restaurant.rows[0].restaurant_name,
              address: restaurant.rows[0].address,
              phone_number: restaurant.rows[0].phone_number,
              rating: restaurant.rows[0].rating,
              close_time: restaurant.rows[0].close_time,
              open_time: restaurant.rows[0].open_time,
              foods: foods
            },
        });
    } catch (error) {
        console.error("Error getting restaurant", error);
        res.status(500).send({ message: "Error getting restaurant detail from the database" });
    }
};

export const createRestaurant = async (req: Request, res: Response) => {
    const { name, address,phone_number, rating, open_time, close_time }: Restaurant = req.body;

    try {
      const restaurant = await db.query(`
        INSERT INTO restaurants (name, address, phone_number, rating, open_time, close_time) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `, [name, address, phone_number, rating, open_time, close_time]);

      res.status(201).json({
        message: "Restaurant Created",
        data: restaurant.rows[0]
      });
    } catch (error) {
      console.error("Error adding restaurant", error);
      res.status(500).send({ message: "Error adding restaurant to the database" });
    }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  const { name, address, phone_number, rating, open_time, close_time }: Restaurant = req.body;
  const restaurant_id = req.params.restaurant_id;
  try {
    const restaurant = await db.query(`
      UPDATE restaurants set
        name = COALESCE($1, name),
        address = COALESCE($2, address),
        phone_number = COALESCE($3, phone_number),
        rating = COALESCE($4, rating),
        open_time = COALESCE($5, open_time),
        close_time = COALESCE($6, close_time)
      WHERE id = $7 RETURNING *
      `, [name, address, phone_number, rating, open_time, close_time, restaurant_id]);

    res.status(200).json({
      message: "Restaurant updated",
      data: restaurant.rows[0]
    });
  } catch (error) {
    console.error("Error updating restaurant", error);
    res.status(500).send({ message: "Error updating restaurant to the database" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  const restaurant_id = req.params.restaurant_id;
  try {
    const restaurant = await db.query(`
      DELETE FROM restaurants 
      WHERE id = $1 RETURNING *
      `, [restaurant_id]);

    res.status(200).json({
      message: "Restaurant deleted",
      data: restaurant.rows[0]
    });
  } catch (error) {
    console.error("Error deleting restaurant", error);
    res.status(500).send({ message: "Error deleting restaurant from the database" });
  }
};



