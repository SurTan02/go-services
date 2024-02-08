import { db } from "@repo/middlewares/database";
import { type Request, type Response } from "express";
import { Payment } from "../models/payment.model";

export const fetchPayments = async (req: Request, res: Response) => {
    try {
    const payments = await db.query(`SELECT * FROM payments`);
    res.status(200).json({
        "message": "Success",
        "data": payments.rows
    });
  } catch (error) {
      console.error("Error fetching payments", error);
      res.status(500).send({ message: "Error fetching payments from the database" });
  }
};

export const getPaymentById = async(req: Request, res: Response) => {
  const payment_id = req.params.payment_id;
  try {
    const payment = await db.query(`SELECT * FROM payments WHERE id = $1`, [payment_id]);
    res.status(200).json({
      "message": "Success",
      "data": payment.rows[0]
    });
  } catch (error) {
    console.error("Error getting payment", error);
    res.status(500).send({ message: "Error getting payment detail from the database" });
  }
};

export const createPayment = async(req: Request, res: Response) => {
  const { order_id, method, status, amount }: Payment = req.body;
  const user_id = req.user.id

  try {
    const paymentMethod = method || 'cash';
    const paymentStatus = status || 'pending';

    const payment = await db.query(`
      INSERT INTO payments (user_id, order_id, method, status, amount) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [user_id, order_id, paymentMethod, paymentStatus, amount]);
    
    res.status(201).json({
      message: "Payment Entry Created",
      data: payment.rows[0]
    });
  } catch (error) {
    console.error("Error adding payment instance", error);
    res.status(500).send({ message: "Error adding payment instance to the database" });
  }
};


export const updatePayment = async(req: Request, res: Response) => {
  const payment_id = req.params.payment_id;
  const { order_id, method, status, amount }: Payment = req.body;
  const user_id = req.user.id

  try {
    const payment = await db.query(`
    UPDATE payments set
      user_id = COALESCE($1, user_id),
      order_id = COALESCE($2, order_id),
      method = COALESCE($3, method),
      status = COALESCE($4, status),
      amount = COALESCE($5, amount)
    WHERE id = $6 RETURNING *`,
    [user_id, order_id, method, status, amount, payment_id]);
    
    res.status(200).json({
      message: "Payment Instance updated",
      data: payment.rows[0]
    });
  } catch (error) {
    console.error("Error updating payment", error);
    res.status(500).send({ message: "Error updating payment to the database" });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  const payment_id = req.params.payment_id;
  try {
    const payment = await db.query(`
      DELETE FROM payments
      WHERE id = $1 RETURNING *
      `, [payment_id]);

    res.status(200).json({
      message: "Payment deleted",
      data: payment.rows[0]
    });
  } catch (error) {
    console.error("Error deleting payment", error);
    res.status(500).send({ message: "Error deleting payment from the database" });
  }
};

export const makePayment = async(req: Request, res: Response) => {
  const payment_id = req.params.payment_id;
  const { amount }: Payment = req.body;

  try {
    const payment_db = await db.query(`
    SELECT amount from  payments WHERE id = $1`,
    [payment_id]);

    const expected = payment_db.rows[0];
    if (amount < expected){
      return res.status(403).json({
        message: `The amount you entered(${amount}) is less than the expected payment(${expected}).`
      });
    }
    
    await db.query(`
      UPDATE payments set
        status = 'completed'
      WHERE id = $1 RETURNING *`,
    [payment_id]);
    res.status(200).json({
      message: "Your payment has been processed successfully."
    });
  } catch (error) {
    console.error("Error updating payment", error);
    res.status(500).send({ message: "Error updating payment to the database" });
  }
};


