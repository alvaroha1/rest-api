import { Express, Request, Response } from "express";
import { resizeImageHandler } from "./controllers/resizeImage.controller";


function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  
  app.get("/api/resize",(req: Request, res: Response) => resizeImageHandler(req, res));
}

export default routes;
