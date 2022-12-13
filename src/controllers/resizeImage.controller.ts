import { Request, Response } from "express";
import { resizeImage } from "../models/resizeImage.model";
import logger from "../utils/logger";

interface params {
  url: string;
}

export async function resizeImageHandler(req: Request, res: Response) {
  try {
    const { url, desiredHeight, desiredWidth } = req.query;
    if (
      url &&
      (desiredHeight ||
      desiredWidth)
    ) {
      const parsedDesiredHeight = parseInt(desiredHeight as string);
/*       if (Number.isNaN(parsedDesiredHeight)) {
        throw "Invalid Height";
      } */
      const parsedDesiredWidth = parseInt(desiredWidth as string);
   /*    if (Number.isNaN(parsedDesiredWidth)) {
        throw "Invalid Width";
      } */
      const resizedImage = await resizeImage(url as string, desiredHeight as string, desiredWidth as string);
      return res
        .status(200)
        .set("Content-Type", `image/png`)
        .send(resizedImage);
    } else {
      return res
        .status(400)
        .send("Please add all the right params to the request");
    }
  } catch (error: any) {
    logger.error(error);
    return res.status(500).send(error.message);
  }
}
