import { Router } from "express";
import { createRestaurant, deleteRestaurant, fetchRestaurants, getRestaurantById, updateRestaurant } from "../controllers/restaurant.controller";
const router = Router();

router.get("/restaurants", fetchRestaurants);
router.post("/restaurants", createRestaurant);
router.get("/restaurants/:restaurant_id", getRestaurantById);
router.patch("/restaurants/:restaurant_id", updateRestaurant);
router.delete("/restaurants/:restaurant_id", deleteRestaurant);

export { router as restaurant };