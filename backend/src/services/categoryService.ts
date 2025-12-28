import Category from '../models/category';

export const getAllCategoriesFromDb = async () => {
    return await Category.find();
};