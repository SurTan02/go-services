import { Router } from "express";
import { createRestaurant, deleteRestaurant, fetchRestaurants, getRestaurantById, updateRestaurant } from "../controllers/restaurant.controller";
import { adminMiddleware, authMiddleware } from "@repo/middlewares/auth";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Restaurant
 *   description: Operations related to managing restaurants
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Fetch all restaurants
 *     tags: 
 *       - Restaurant
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
 *                     $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching restaurants from the database
 */
router.get("/restaurants", authMiddleware, fetchRestaurants);

/**
 * @swagger
 * /restaurants/{restaurant_id}:
 *   get:
 *     summary: Fetch a restaurant by ID
 *     tags: 
 *       - Restaurant
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant to fetch
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: There is no restaurant with the specified ID
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching restaurant from the database
 */
router.get("/restaurants/:restaurant_id", authMiddleware, getRestaurantById);

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: 
 *       - Restaurant
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error adding restaurant to the database
 */
router.post("/restaurants", adminMiddleware, createRestaurant);

/**
 * @swagger
 * /restaurants/{restaurant_id}:
 *   patch:
 *     summary: Update an existing restaurant
 *     tags: 
 *       - Restaurant
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant to update
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Restaurant updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating restaurant to the database
 */
router.patch("/restaurants/:restaurant_id", adminMiddleware, updateRestaurant);


/**
 * @swagger
 * /restaurants/{restaurant_id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: 
 *       - Restaurant
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Restaurant deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting restaurant from the database
 */
router.delete("/restaurants/:restaurant_id", adminMiddleware, deleteRestaurant);

export { router as restaurant };