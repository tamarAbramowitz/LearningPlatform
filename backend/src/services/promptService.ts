import Prompt from '../models/prompt';
import { generateLesson } from './aiService';

export const createNewLesson = async (promptData: any) => {
    const aiContent = await generateLesson(
        promptData.category_name, 
        promptData.sub_category_name, 
        promptData.prompt
    );

    const newPrompt = new Prompt({
        user_id: promptData.user_id,
        category_id: promptData.category_id,
        sub_category_id: promptData.sub_category_id,
        prompt: promptData.prompt,
        response: aiContent
    });

    return await newPrompt.save();
};