import { Router } from "express";
import { adminMiddleware, authMiddleware } from "@repo/middlewares/auth";
import { createPayment, deletePayment, fetchPayments, getPaymentById, makePayment, updatePayment } from "../controllers/payment.controller";
const router = Router();

router.get("/payments", authMiddleware, fetchPayments);
router.get("/payments/:payment_id", authMiddleware, getPaymentById);
router.post("/payments", authMiddleware, createPayment);
router.patch("/payments/:payment_id", adminMiddleware, updatePayment);
router.delete("/payments/:payment_id", adminMiddleware, deletePayment);

router.post("/payments/:payment_id", authMiddleware, makePayment)

export { router as payment };