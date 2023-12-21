import mongoose from "mongoose";

const dbConnection = async () => {
   
    const mongoURL = process.env.MONGODB_ATLAS;
    
    if (!mongoURL) throw new Error('MongoDB connection URL is not defined in environment variables.');
    
    mongoose.connect(mongoURL)
    .then(() => console.log('Database online.'))
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));
    
};

export default dbConnection;

