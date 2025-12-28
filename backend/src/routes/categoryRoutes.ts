import { Router } from 'express';
import Category from '../models/category';
import SubCategory from '../models/subCategory';

const router = Router();

// נתיב לקבלת כל הקטגוריות
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// נתיב לקבלת תתי-קטגוריות לפי מזהה קטגוריה
router.get('/:categoryId/subcategories', async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ category_id: req.params.categoryId });
    res.json(subCategories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;