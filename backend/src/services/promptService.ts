import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config(); 

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
}) : null;

export const generateLearningContent = async (category: string, subCategory: string) => {
  try {
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    const prompt = `Create a learning module for ${category} specifically about ${subCategory}. 
    Return the response in JSON format with the following fields:
    - topic: the sub-category name
    - explanation: a clear explanation of the topic.
    - task: a practical task for the student to perform.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    const parsed = content ? JSON.parse(content) : null;
    if (parsed) {
      parsed.topic = parsed.topic || subCategory;
    }
    return parsed;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate content");
  }
};