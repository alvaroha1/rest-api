import { Application } from "express";
import createServer from "./utils/createServer";
import logger from "./utils/logger";

const port = process.env.PORT;

createServer().then((app:Application) => {
  app.listen(port, async () => {
    logger.info(`🚀 running at http://localhost:${port}`);
  });
})