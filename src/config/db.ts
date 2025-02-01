import mongoose from "mongoose";

// Connect to MongoDB
export function connectDB() {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/faqdb')
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('MongoDB connection error:', err));
}