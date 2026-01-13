import { Request, Response } from 'express';
import IPrompt from '../models/prompt';
import Category from '../models/category';
import SubCategory from '../models/subCategory';
import { generateLearningContent } from '../services/promptService';
import mongoose from 'mongoose';


export const getAIContent = async (req: Request, res: Response) => {
  try {
    const { category_id, sub_category_id, prompt, user_id: body_user_id } = req.body;

    const user_id = (req as any).user?._id || body_user_id;

    if (!user_id) {
      return res.status(401).json({ message: "משתמש לא מזוהה" });
    }

    // Fetch category and sub-category names
    const category = await Category.findById(category_id);
    const subCategory = sub_category_id ? (mongoose.Types.ObjectId.isValid(sub_category_id) ? await SubCategory.findById(sub_category_id) : await SubCategory.findOne({ name: sub_category_id })) : null;
    const categoryName = category ? category.name : 'לא ידוע';
    const subCategoryName = subCategory ? subCategory.name : sub_category_id;

    let aiResponse;
    try {
      aiResponse = await generateLearningContent(categoryName, subCategoryName);
      console.log("Fetched from Real AI API");
    } catch (apiError) {
      console.warn("AI API failed, switching to Offline Mock Mode");
      console.log("Category Name:", categoryName, "SubCategory Name:", subCategoryName);

      aiResponse = {
        topic: subCategoryName,
        explanation: `שלום! כרגע המערכת במצב אופליין (ללא חיבור ל-AI). \nהנה מידע בסיסי על ${subCategoryName} בתחום ${categoryName}.${prompt ? `\nבנוגע לשאלתך: "${prompt}", נשמח להרחיב עליה כשתחזור המערכת למצב אונליין.` : ''}`,
        task: `המשימה שלך: קרא עוד על הנושא ${subCategoryName} ונסה לסכם אותו ב-3 משפטים.`,
        isMock: true
      };
    }
    const newPrompt = new IPrompt({
      user_id: user_id,
      category_id: category_id,
      sub_category_id: sub_category_id || 'General',
      prompt: prompt || "No prompt provided",
      response: typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse),
      created_at: new Date()
    });

    await newPrompt.save();
    console.log("Saved to History successfully!");

    res.status(201).json({
      success: true,
      data: newPrompt
    });

  } catch (error: any) {
    console.error("AI API failed:", error);
    return res.status(503).json({
      success: false,
      message: "השיעור לא נמסר עקב בעיות בחיבור ל-AI. אנא נסה שוב מאוחר יותר."
    });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const history = await IPrompt.find({ user_id }).sort({ created_at: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ message: "Error fetching history" });
  }
};


export const getAllPrompts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const prompts = await IPrompt.find()
      .populate('user_id', 'name')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);

    const total = await IPrompt.countDocuments();

    res.status(200).json({
      success: true,
      count: prompts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: prompts
    });
  } catch (error) {
    console.error("Admin History error:", error);
    res.status(500).json({ message: "שגיאה בשליפת היסטוריה כללית למנהל" });
  }
};