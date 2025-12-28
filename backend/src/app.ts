// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import * as dotenv from 'dotenv';
// import { errorHandler } from './middleWare/errorHandler';

// import categoryRoutes from './routes/categoryRoutes';
// import userRoutes from './routes/userRoutes';
// import promptRoutes from './routes/promptRoutes'; 

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/categories', categoryRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/prompts', promptRoutes);

// app.use(errorHandler);

// const MONGO_URI = process.env.MONGO_URI || ""; 

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB connected successfully! 🎉'))
//   .catch((err) => console.error('Connection error:', err));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';

import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';
import promptRoutes from './routes/promptRoutes';
import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app: Application = express();

app.use(cors()); 
app.use(express.json()); 
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/prompts', promptRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('AI Learning Platform API is running...');
});

app.use(errorHandler);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/learning_platform';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully!');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); 
    });

export default app;