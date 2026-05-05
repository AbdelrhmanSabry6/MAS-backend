import BlogCategory from "../../databases/models/blogCategory.model.js";
import AppError from "../../utils/AppError.js";

export const createBlogCategory = async (data) => {
    return await BlogCategory.create(data);
};

export const getAllBlogCategories = async () => {
    return await BlogCategory.find().sort({ createdAt: -1 });
};

export const updateBlogCategory = async (id, data) => {
    const category = await BlogCategory.findByIdAndUpdate(id, data, {
        new: true,
    });

    if (!category) {
        throw new AppError("Blog category not found", 404);
    }

    return category;
};

export const deleteBlogCategory = async (id) => {
    const category = await BlogCategory.findByIdAndDelete(id);

    if (!category) {
        throw new AppError("Blog category not found", 404);
    }

    return category;
};