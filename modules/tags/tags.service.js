import Tag from "../../databases/models/tag.model.js";
import AppError from "../../utils/AppError.js";

export const createTag = async (data) => {
    const tag = new Tag(data);
    return await tag.save();
};

export const getAllTags = async () => {
    return await Tag.find().sort({ createdAt: -1 });
};

export const updateTag = async (id, data) => {
    const tag = await Tag.findByIdAndUpdate(id, data, { new: true });

    if (!tag) {
        throw new AppError("Tag not found", 404);
    }

    return tag;
};

export const deleteTag = async (id) => {
    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
        throw new AppError("Tag not found", 404);
    }

    return tag;
};