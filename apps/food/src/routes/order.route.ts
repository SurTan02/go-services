import { Router } from "express";
import { fetchOrders, placeOrder } from "../controllers/order.controller";
import { authMiddleware } from "@repo/middlewares/auth";
const router = Router();

router.get("/orders", fetchOrders);
router.post("/orders", authMiddleware, placeOrder);
// router.get("/orders/:food_id", getFoodById);
// router.patch("/orders/:food_id", updateFood);
// router.delete("/orders/:food_id", deleteFood);

export { router as order };