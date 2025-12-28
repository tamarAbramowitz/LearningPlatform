import { Router } from 'express';
import { getCategories } from '../controllers/categoryController';
import { getSubCategories } from '../controllers/subCategoryController';

const router = Router();

router.get('/', getCategories);

router.get('/:categoryId/subcategories', getSubCategories);

export default router;