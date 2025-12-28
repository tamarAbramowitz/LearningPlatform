import { Request, Response } from 'express';
import { getSubCategoriesFromDb } from '../services/subCategoryService';

export const getSubCategories = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const subCategories = await getSubCategoriesFromDb(categoryId);
        res.status(200).json(subCategories);
    } catch (error: any) {
        res.status(500).json({ message: 'שגיאה בשליפת תתי-קטגוריות', error: error.message });
    }
};