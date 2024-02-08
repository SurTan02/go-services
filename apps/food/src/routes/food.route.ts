import { Router } from "express";
import { createFood, deleteFood, fetchFoods, getFoodById, updateFood } from "../controllers/food.controller";
import { adminMiddleware, authMiddleware } from "@repo/middlewares/auth";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Food
 *   description: Operations related to managing food items
 */

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Fetch all foods
 *     tags: [Food]
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
 *                     $ref: '#/components/schemas/Food'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching foods from the database
 */
router.get("/foods", authMiddleware, fetchFoods);

/**
 * @swagger
 * /foods/{food_id}:
 *   get:
 *     summary: Get food by ID
 *     tags: [Food]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: food_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the food to get
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error getting food detail from the database
 */
router.get("/foods/:food_id", authMiddleware, getFoodById);

/**
 * @swagger
 * /foods:
 *   post:
 *     summary: Create a new food item
 *     tags: [Food]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: Food added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error adding food to the database
 */
router.post("/foods", adminMiddleware, createFood);

/**
 * @swagger
 * /foods/{food_id}:
 *   patch:
 *     summary: Update a food item by ID
 *     tags: [Food]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: food_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the food to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: Food updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating food to the database
 */
router.patch("/foods/:food_id", adminMiddleware, updateFood);

/**
 * @swagger
 * /foods/{food_id}:
 *   delete:
 *     summary: Delete a food item by ID
 *     tags: [Food]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: food_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the food to delete
 *     responses:
 *       200:
 *         description: Food deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting food from the database
 */
router.delete("/foods/:food_id", adminMiddleware, deleteFood);

export { router as food };