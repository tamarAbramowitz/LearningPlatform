import mongoose, { Schema, Document } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  category_id: mongoose.Types.ObjectId;
}

const SubCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  category_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  }
});

export default mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);


//category,prompt,subcategory,users