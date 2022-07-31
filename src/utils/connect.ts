import config from "config";
import mongoose from "mongoose";
import logger from './logger';

export default async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected")
  } catch (error) {
    logger.error("Could not connect to DB");
    process.exit(1);
  }
}
