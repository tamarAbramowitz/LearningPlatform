import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';

import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

const MONGO_URI = "mongodb+srv://tamarAbramowitz:tamar0533@cluster0.qx7jfql.mongodb.net/?appName=Cluster0";
const PORT = process.env.PORT || 3000;


mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully! 🎉'))
  .catch((err: Error) => console.error('Connection error:', err.message));


  app.post('/api/prompts', (req: Request, res: Response) => {
  const { category_id, sub_category_id, prompt } = req.body;

  const aiGeneratedText = `שלום! הנה השיעור שלך בנושא שביקשת. השאלה שלך הייתה: "${prompt}". התשובה מה-AI תופיע כאן בקרוב.`;

  res.status(200).json({
    data: {
      response: aiGeneratedText
    }
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});