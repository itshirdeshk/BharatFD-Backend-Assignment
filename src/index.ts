import express from 'express';
import dotenv from 'dotenv';
import faqRoutes from './routes/faqRoutes';
import { connectDB } from './config/db';
import { errorHandler } from './error/errorHandler';

dotenv.config();
connectDB();

export const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api', faqRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});