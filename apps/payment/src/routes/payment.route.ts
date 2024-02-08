import { Router } from "express";
import { adminMiddleware, authMiddleware } from "@repo/middlewares/auth";
import { createPayment, deletePayment, fetchPayments, getPaymentById, makePayment, updatePayment } from "../controllers/payment.controller";
const router = Router();


/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Operations related to managing payments
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Fetch all payments
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching payments from the database
 */

/**
 * @swagger
 * /payments/{payment_id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payment to get
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error getting payment detail from the database
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment entry
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       201:
 *         description: Payment Entry Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error adding payment instance to the database
 */

/**
 * @swagger
 * /payments/{payment_id}:
 *   patch:
 *     summary: Update an existing payment instance
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       200:
 *         description: Payment Instance updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating payment to the database
 */

/**
 * @swagger
 * /payments/{payment_id}:
 *   delete:
 *     summary: Delete an existing payment instance
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payment to delete
 *     responses:
 *       200:
 *         description: Payment deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting payment from the database
 */

/**
 * @swagger
 * /payments/{payment_id}:
 *  

 post:
 *     summary: Make payment for an order
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payment to make
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to pay for the order
 *     responses:
 *       200:
 *         description: Your payment has been processed successfully.
 *       403:
 *         description: The amount you entered is less than the expected payment.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating payment to the database
 */

router.get("/payments", authMiddleware, fetchPayments);
router.get("/payments/:payment_id", authMiddleware, getPaymentById);
router.post("/payments", authMiddleware, createPayment);
router.patch("/payments/:payment_id", adminMiddleware, updatePayment);
router.delete("/payments/:payment_id", adminMiddleware, deletePayment);

router.post("/payments/:payment_id", authMiddleware, makePayment)

export { router as payment };