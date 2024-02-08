/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Burger"
 *           description: The name of the food.
 *         description:
 *           type: string
 *           example: "Delicious burger with cheese and veggies"
 *           description: The description of the food.
 *         price:
 *           type: number
 *           format: float
 *           example: 9.99
 *           description: The price of the food.
 *         image:
 *           type: string
 *           example: "burger.jpg"
 *           description: The URL or path to the image of the food.
 *         restaurant_id:
 *           type: string
 *           example: "54321"
 *           description: The ID of the restaurant associated with the food (uuid).
 */
export interface Food {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurant_id?: string;
}