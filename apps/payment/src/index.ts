import { config } from "@repo/middlewares/config";
import { createServer } from "./server";

const hostname = config.APP_ENDPOINT
const port = config.PAYMENT_SERVICE_PORT;
const server = createServer();

server.listen(port, () => {
  console.log(`[PAYMENT] running on ${hostname}:${port}`);
});