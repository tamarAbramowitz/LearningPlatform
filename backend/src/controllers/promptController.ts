import { Request, Response } from 'express';
import Prompt from '../models/prompt';
import { generateLesson } from '../services/aiService';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { user_id, category_id, sub_category_id, prompt, category_name, sub_category_name } = req.body;

    if (!user_id || !category_id || !sub_category_id || !prompt) {
      return res.status(400).json({ message: 'כל השדות הם חובה' });
    }

    const aiResponse = await generateLesson(category_name, sub_category_name, prompt);

    const newPrompt = new Prompt({
      user_id,
      category_id,
      sub_category_id,
      prompt,
      response: aiResponse 
    });

    await newPrompt.save();

    res.status(201).json({ 
      message: 'השיעור נוצר בהצלחה', 
      data: newPrompt 
    });
    
  } catch (error: any) {
    res.status(500).json({ message: 'שגיאה ביצירת השיעור', error: error.message });
  }
};