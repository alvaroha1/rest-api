import dotenv from "dotenv";
import "dotenv/config";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import routes from "../routes";
dotenv.config();

const swaggerDocument = YAML.load("./swagger.yaml");

async function createServer(): Promise<Application> {
  const app = express();
  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  routes(app);
  return app;
}

export default createServer;
