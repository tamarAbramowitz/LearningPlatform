import { Request, Response } from 'express';
import User from '../models/user'; 
import Prompt from '../models/prompt';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ message: 'שם ומספר טלפון הם שדות חובה' });
        }

        let user = await User.findOne({ phone });
        if (user) {
            return res.status(200).json({ message: 'משתמש קיים', data: user });
        }

        user = new User({ name, phone });
        await user.save();

        res.status(201).json({ message: 'משתמש נרשם בהצלחה', data: user });
    } catch (error: any) {
        res.status(500).json({ message: 'שגיאה ברישום המשתמש', error: error.message });
    }
};

export const getUserHistory = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const history = await Prompt.find({ user_id: userId })
            .populate('category_id', 'name')
            .populate('sub_category_id', 'name')
            .sort({ created_at: -1 }); // מהחדש לישן

        res.status(200).json({ data: history });
    } catch (error: any) {
        res.status(500).json({ message: 'שגיאה בשליפת ההיסטוריה', error: error.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error: any) {
        res.status(500).json({ message: 'שגיאה בשליפת משתמשים', error: error.message });
    }
};