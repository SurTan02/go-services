export interface Payment {
  id?: string;
  user_id: string;
  order_id: string;
  method: string;
  status: string;
  amount: number;
  payment_date: string;
}


/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the payment
 *         user_id:
 *           type: string
 *           description: The ID of the user who made the payment
 *         order_id:
 *           type: string
 *           description: The ID of the order for which payment is made
 *         method:
 *           type: string
 *           description: The payment method (e.g., cash, credit card)
 *         status:
 *           type: string
 *           description: The payment status (e.g., pending, completed)
 *         amount:
 *           type: number
 *           description: The amount of the payment
 *       required:
 *         - user_id
 *         - order_id
 *         - method
 *         - status
 *         - amount
 *     PaymentInput:
 *       type: object
 *       properties:
 *         order_id:
 *           type: string
 *           description: The ID of the order for which payment is made
 *         method:
 *           type: string
 *           description: The payment method (e.g., cash, credit card)
 *         status:
 *           type: string
 *           description: The payment status (e.g., pending, completed)
 *         amount:
 *           type: number
 *           description: The amount of the payment
 *       required:
 *         - order_id
 *         - amount
 */