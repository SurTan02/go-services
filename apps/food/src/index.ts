import { config } from "@repo/middlewares/config";
import { createServer } from "./server";

const hostname = config.APP_ENDPOINT
const port = config.FOOD_SERVICE_PORT;
const server = createServer();

server.listen(port, () => {
  console.log(`[FOOD] running on ${hostname}:${port}`);
});