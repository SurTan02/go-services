import { Router } from "express";
import { restaurant } from "./restaurant.route";
import { food } from "./food.route";
import { order } from "./order.route";

const router = Router();

router.use(restaurant)
router.use(food)
router.use(order)

export { router }