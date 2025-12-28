import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateLesson = async (category: string, subCategory: string, userPrompt: string) => {
  try {
    const systemPrompt = `You are an expert teacher. 
    The user wants to learn about ${category} - ${subCategory}. 
    Please provide a clear, engaging, and educational lesson based on their request.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error: any) {
    console.error("AI Service Error:", error);
    return `This is a simulated lesson about ${subCategory} because the AI key is not configured. (Original Prompt: ${userPrompt})`;
  }
};