import { createServer } from "./server";

const port = process.env.USER_SERVICE_PORT || 3000;
const server = createServer();

server.listen(port, () => {
  console.log(`[USER] running on http://localhost:${port}`);
});