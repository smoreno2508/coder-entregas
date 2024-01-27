import mongoose from "mongoose";
import { buildLogger } from "../helpers/logger.js";

const logger = buildLogger("Database");

const dbConnection = async () => {
   
    const mongoURL = process.env.MONGODB_ATLAS;
    
    if (!mongoURL) throw new Error('MongoDB connection URL is not defined in environment variables.');
    
    mongoose.connect(mongoURL)
    .then(() => logger.debug('Database online.'))
    .catch((error) => logger.error('Error connecting to MongoDB:', error.message));
    
};

export default dbConnection;

