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
    .use("/api/v1/", router);
  
  swaggerDocs(app, config.FOOD_SERVICE_PORT as number)
  return app;
};