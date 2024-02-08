export interface Order {
  id: string;
  user_id: string;
  food_id: string;
  amount: number;
  order_date: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the order
 *         user_id:
 *           type: string
 *           description: The ID of the user who placed the order
 *         food_id:
 *           type: string
 *           description: The ID of the food ordered
 *         order_date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was placed
 *         amount:
 *           type: number
 *           description: The amount of the order
 *       required:
 *         - user_id
 *         - food_id
 *         - order_date
 *         - amount
 *     OrderInput:
 *       type: object
 *       properties:
 *         food_id:
 *           type: string
 *           description: The ID of the food to order
 *       required:
 *         - food_id
 */