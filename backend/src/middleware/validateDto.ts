import { Request, Response, NextFunction } from 'express';

export const validatePromptRequest = (req: Request, res: Response, next: NextFunction) => {
    const { user_id, category_id, sub_category_id, prompt } = req.body;
    
    if (!user_id || !category_id || !sub_category_id || !prompt) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    
    next(); 
};