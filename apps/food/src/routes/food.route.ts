import { Router } from "express";
import { createFood, deleteFood, fetchFoods, getFoodById, updateFood } from "../controllers/food.controller";
const router = Router();

router.get("/foods", fetchFoods);
router.post("/foods", createFood);
router.get("/foods/:food_id", getFoodById);
router.patch("/foods/:food_id", updateFood);
router.delete("/foods/:food_id", deleteFood);

export { router as food };