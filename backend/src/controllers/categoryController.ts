import { Request, Response } from 'express';
import { getAllCategoriesFromDb } from '../services/categoryService';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategoriesFromDb();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ message: 'שגיאה בשליפת קטגוריות', error: error.message });
    }
};