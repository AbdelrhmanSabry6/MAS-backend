import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

export default BlogCategory;
