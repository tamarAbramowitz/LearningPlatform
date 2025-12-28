import SubCategory from '../models/subCategory';

export const getSubCategoriesByCategoryId = async (categoryId: string) => {
    return await SubCategory.find({ category_id: categoryId });
};

export const getSubCategoriesFromDb = async (categoryId: string) => {
    return await SubCategory.find({ category_id: categoryId });
};