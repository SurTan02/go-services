import { db } from "@repo/middlewares/database";
import { type Request, type Response } from "express";
import { isTimeBetween } from "../utils/time";
import { Order } from "../models/order.model";
import axios from 'axios';
import { config } from "@repo/middlewares/config";

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

    const { id, amount } = order.rows[0]
    // create payment entry
    
    const payment_service = `${config.APP_ENDPOINT}:${config.PAYMENT_SERVICE_PORT}`
    await axios.post(`${payment_service}/api/v1/payments/`, {
      order_id: id, amount
    }, {
      headers: {
        Authorization: req.headers.authorization
      }
    })
    
    res.status(201).json({
      message: "Order Placed",
      data: order.rows[0]
    });
  } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).send({ message: "Error placing order to the database" });
  }
};

export const updateOrder = async(req: Request, res: Response) => {
  const order_id = req.params.order_id;
  const { user_id, food_id, amount, order_date}: Order = req.body;

  try {
    const order = await db.query(`
    UPDATE orders set
        user_id = COALESCE($1, user_id),
        food_id = COALESCE($2, food_id),
        amount = COALESCE($3, amount),
        order_date = COALESCE($4, order_date),
    WHERE id = $5 RETURNING *`,
    [user_id, food_id, amount, order_date, order_id]);
    
    res.status(200).json({
      message: "Order updated",
      data: order.rows[0]
    });
  } catch (error) {
    console.error("Error updating order", error);
    res.status(500).send({ message: "Error updating order to the database" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const order_id = req.params.order_id;
  try {
    const order = await db.query(`
      DELETE FROM orders
      WHERE id = $1 RETURNING *
      `, [order_id]);

    res.status(200).json({
      message: "Order deleted",
      data: order.rows[0]
    });
  } catch (error) {
    console.error("Error deleting Order", error);
    res.status(500).send({ message: "Error deleting Order from the database" });
  }
};