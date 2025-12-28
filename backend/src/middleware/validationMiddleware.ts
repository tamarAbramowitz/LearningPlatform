import { Request, Response, NextFunction } from 'express';

export const validatePrompt = (req: Request, res: Response, next: NextFunction) => {
    const { user_id, category_id, sub_category_id, prompt } = req.body;

    if (!user_id || !category_id || !sub_category_id || !prompt) {
        return res.status(400).json({ 
            success: false, 
            message: 'חסרים נתונים חיוניים: user_id, category_id, sub_category_id, prompt' 
        });
    }

    if (prompt.length < 5) {
        return res.status(400).json({ 
            success: false, 
            message: 'הפרומפט קצר מדי, אנא פרט יותר' 
        });
    }

    next();
};