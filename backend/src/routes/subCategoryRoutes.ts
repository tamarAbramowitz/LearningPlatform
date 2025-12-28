import { Router } from 'express';
import { getSubCategories } from '../controllers/subCategoryController';

const router = Router();

router.get('/:categoryId', getSubCategories);

export default router;