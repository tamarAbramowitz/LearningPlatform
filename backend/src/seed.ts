import mongoose from 'mongoose';
import Category from './models/category';
import SubCategory from './models/subCategory'; 
import * as dotenv from 'dotenv';

dotenv.config();

const seedDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/learning_platform');

  await Category.deleteMany({});
  await SubCategory.deleteMany({});

  const science = await Category.create({ name: 'Science' });
  const history = await Category.create({ name: 'History' });

  await SubCategory.create([
    { name: 'Space', category_id: science._id },
    { name: 'Biology', category_id: science._id },
    { name: 'Ancient Egypt', category_id: history._id }
  ]);

  console.log('Database Seeded Successfully!');
  process.exit();
};

seedDB();