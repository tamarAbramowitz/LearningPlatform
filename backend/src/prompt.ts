import mongoose, { Schema, Document } from 'mongoose';

// הגדרת ה-Interface עבור ה-TypeScript (בונוס משמעותי במשימה)
export interface IPrompt extends Document {
  user_id: mongoose.Types.ObjectId;
  category_id: mongoose.Types.ObjectId;
  sub_category_id: mongoose.Types.ObjectId;
  prompt: string;
  response: string;
  created_at: Date;
}

const PromptSchema: Schema = new Schema({
  // קישור למודל המשתמש
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // חייב להיות תואם לשם שנתת במודל המשתמש
    required: true 
  },
  // קישור לקטגוריה
  category_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  // קישור לתת-קטגוריה
  sub_category_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'SubCategory', 
    required: true 
  },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IPrompt>('Prompt', PromptSchema);