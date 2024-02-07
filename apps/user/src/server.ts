import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Login, Register } from "./controller";

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
    });

  app.post("/register", Register)  
  app.post("/login", Login)  
  return app;
};