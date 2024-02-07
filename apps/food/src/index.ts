import { createServer } from "./server";

const port = process.env.FOOD_SERVICE_PORT || 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`[FOOD] running on http://localhost:${port}`);
});