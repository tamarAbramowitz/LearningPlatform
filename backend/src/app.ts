// // import express, { Application, Request, Response } from 'express';
// // import mongoose from 'mongoose';
// // import cors from 'cors';
// // import * as dotenv from 'dotenv';

// // import categoryRoutes from './routes/categoryRoutes';
// // import userRoutes from './routes/userRoutes';
// // import promptRoutes from './routes/promptRoutes';
// // import { errorHandler } from './middleware/errorMiddleware';

// // dotenv.config();

// // const app: Application = express();

// // app.use(cors()); 
// // app.use(express.json()); 
// // app.use('/api/categories', categoryRoutes);
// // app.use('/api/users', userRoutes);
// // app.use('/api/prompts', promptRoutes);

// // app.get('/', (req: Request, res: Response) => {
// //     res.send('AI Learning Platform API is running...');
// // });

// // app.use(errorHandler);

// // const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://tamarAbramowitz:tamar0533@cluster0.qx7jfql.mongodb.net/?appName=Test';
// // const PORT = process.env.PORT || 3000;

// // mongoose.connect(MONGO_URI)
// //     .then(() => {
// //         console.log('✅ Connected to MongoDB successfully!');
// //         app.listen(PORT, () => {
// //             console.log(`🚀 Server is running on port ${PORT}`);
// //         });
// //     })
// //     .catch((err) => {
// //         console.error('❌ MongoDB connection error:', err.message);
// //         process.exit(1); 
// //     });

// // export default app;


// import express, { Application, Request, Response } from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import * as dotenv from 'dotenv';

// import categoryRoutes from './routes/categoryRoutes';
// import userRoutes from './routes/userRoutes';
// import promptRoutes from './routes/promptRoutes';
// import { errorHandler } from './middleware/errorMiddleware';

// dotenv.config();

// const app: Application = express();

// // Middleware
// app.use(cors()); 
// app.use(express.json()); 

// // Routes - שימי לב שזה מופיע לפני ה-ErrorHandler
// app.use('/api/categories', categoryRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/prompts', promptRoutes);

// app.get('/', (req: Request, res: Response) => {
//     res.send('AI Learning Platform API is running...');
// });

// // Error Handling Middleware
// app.use(errorHandler);

// const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://tamarAbramowitz:tamar0533@cluster0.qx7jfql.mongodb.net/?appName=Test';
// const PORT = process.env.PORT || 3000;

// // שינוי קריטי: השרת עולה מיד
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on port ${PORT}`);
//     console.log(`🔗 Test Route: http://localhost:3000/api/prompts/test`);
// });

// // ניסיון חיבור ל-DB מבלי לעצור את השרת במקרה של שגיאה
// mongoose.connect(MONGO_URI)
//     .then(() => {
//         console.log('✅ Connected to MongoDB successfully!');
//     })
//     .catch((err) => {
//         console.error('❌ MongoDB connection error:', err.message);
//         console.log('⚠️  The server is running but Database features will fail until IP is whitelisted.');
//     });

// export default app;


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


import { errorHandler } from './middleware/errorMiddleware'; 

import promptRoutes from './routes/promptRoutes';
import categoryRoutes from './routes/categoryRoutes';
import subCategoryRoutes from './routes/subCategoryRoutes';
import userRoutes from './routes/userRoutes'; 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_learning';
mongoose.connect(mongoURI).then(() => console.log('Connected to MongoDB'));


app.use('/api/ai', promptRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sub-categories', subCategoryRoutes);
app.use('/api/users', userRoutes); 


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.use(cors());
