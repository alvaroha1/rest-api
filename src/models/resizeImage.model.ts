import fetch from "node-fetch";
import sharp from "sharp";

export async function resizeImage(url: string, desiredHeight: string , desiredWidth: string) {
  try {
    let parsedDesiredHeight
    if (desiredHeight !== undefined) parsedDesiredHeight = parseInt(desiredHeight);

    const parsedDesiredWidth = parseInt(desiredWidth);

    const image = await fetch(url);
    const imageBuffer = await image.buffer();
    const resizedImage = await sharp(imageBuffer)
      .resize({ width: parsedDesiredWidth, height: parsedDesiredHeight })
      .png()
      .toBuffer()
      .catch((err) => console.error("Error occurred while processing the image", err));
    return resizedImage;
  } catch (error: any) {
    throw new Error(error);
  }
}
