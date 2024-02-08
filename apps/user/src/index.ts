import { config } from "@repo/middlewares/config";
import { createServer } from "./server";

const hostname = config.APP_ENDPOINT
const port = config.USER_SERVICE_PORT;
const server = createServer();

server.listen(port, () => {
  console.log(`[USER] running on ${hostname}:${port}`);
});