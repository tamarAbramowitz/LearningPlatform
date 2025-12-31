import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body; 
    if (!name) {
      return res.status(400).json({ message: "שם הקטגוריה חסר" });
    }

    const allCategories = await categoryService.getAllCategories();
    const existing = allCategories.find(c => c.name.toLowerCase() === name.toLowerCase());
    
    if (existing) {
      return res.status(200).json(existing); 
    }

    const category = await categoryService.createNewCategory(name); 
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "שגיאה ביצירת קטגוריה" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};