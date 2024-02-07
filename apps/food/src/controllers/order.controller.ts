import { db } from "@repo/middlewares/database";
import { type Request, type Response } from "express";
import { isTimeBetween } from "../utils/time";

export const fetchOrders = async (req: Request, res: Response) => {
    try {
    const orders = await db.query(`SELECT * FROM orders`);
    res.status(200).json({
        "message": "Success",
        "data": orders.rows
    });
  } catch (error) {
      console.error("Error fetching orders", error);
      res.status(500).send({ message: "Error fetching orders from the database" });
  }
};

export const getOrderById = async(req: Request, res: Response) => {
  const order_id = req.params.order_id;
  try {
    const order = await db.query(`SELECT * FROM orders WHERE id = $1`, [order_id]);
    res.status(200).json({
      "message": "Success",
      "data": order.rows[0]
    });
  } catch (error) {
    console.error("Error getting order", error);
    res.status(500).send({ message: "Error getting order detail from the database" });
  }
};

// For simplicity purpope, the order is directly to the food, it is better if the order only contain restaurant_id + user id
// And not food, food information should be in order detail.
export const placeOrder = async (req: Request, res: Response) => {
  const { food_id } = req.body;
  const user_id = req.user.id;

  try {
    // check the pickup time of restaurant
    const db_data = await db.query(
      `
        SELECT r.open_time, r.close_time, f.price
        FROM restaurants r JOIN foods f on
        f.restaurant_id = r.id
        WHERE f.id = $1
      `, [food_id]
    );
    const {open_time, close_time, price} = db_data.rows[0]
    const cur_time = new Date()
    const date_time = cur_time.toLocaleString("en-US", { timeZone: "Asia/Jakarta", hour12: false });
    const time = cur_time.toLocaleTimeString("en-US", { timeZone: "Asia/Jakarta", hour12: false });
    
    if (!isTimeBetween(open_time, close_time, time)){
      return res.status(403).json({
        message: 'Restaurant is closed. Unable to place order.'
      });
    }

    const order = await db.query(`
      INSERT INTO orders (user_id, food_id, order_date, amount) 
      VALUES ($1, $2, $3, $4) RETURNING *
      `, [user_id, food_id, date_time, price]);

    res.status(201).json({
      message: "Order Placed",
      data: order.rows[0]
    });
  } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).send({ message: "Error placing order to the database" });
  }
};
