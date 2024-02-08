import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { router } from "./routes/routes";
import swaggerDocs from "@repo/middlewares/swagger";
import { config } from "@repo/middlewares/config";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    })
  
  swaggerDocs(app, config.PAYMENT_SERVICE_PORT as number)
  app.use("/api/v1", router)
  return app;
};