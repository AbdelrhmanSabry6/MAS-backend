import ProjectCategory from "../../databases/models/projectCategory.model.js";
import AppError from "../../utils/AppError.js";

export const createProjectCategory = async (data) => {
    const category = new ProjectCategory(data);
    return await category.save();
};

export const getAllProjectCategories = async () => {
    return await ProjectCategory.find().sort({ createdAt: -1 });
};

export const updateProjectCategory = async (id, data) => {
    const category = await ProjectCategory.findByIdAndUpdate(id, data, {
        new: true,
    });

    if (!category) {
        throw new AppError("Project category not found", 404);
    }

    return category;
};

export const deleteProjectCategory = async (id) => {
    const category = await ProjectCategory.findByIdAndDelete(id);

    if (!category) {
        throw new AppError("Project category not found", 404);
    }

    return category;
};