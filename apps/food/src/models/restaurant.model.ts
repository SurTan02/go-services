export interface Restaurant {
  id?: string;
  name: string;
  address: string;
  phone_number: string;
  rating: number;
  open_time: string;
  close_time: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Restaurant A"
 *           description: The name of the restaurant
 *         address:
 *           type: string
 *           example: "XYZ Street"
 *           description: The address of the restaurant
 *         phone_number:
 *           type: string
 *           example: "+628123456798"
 *           description: The phone number of the restaurant
 *         rating:
 *           type: number
 *           example: 5.0
 *           description: The rating of the restaurant
 *         open_time:
 *           type: string
 *           format: time
 *           example: "09:00:00"
 *           description: The opening time of the restaurant
 *         close_time:
 *           type: string
 *           format: time
  *           example: "12:00:00"
 *           description: The closing time of the restaurant
 *       required:
 *         - name
 *         - address
 *         - phone_number
 *         - rating
 *         - open_time
 *         - close_time
 */
