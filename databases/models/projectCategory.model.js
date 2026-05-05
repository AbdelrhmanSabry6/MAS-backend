import mongoose from "mongoose";

const projectCategorySchema = new mongoose.Schema(
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
        description: { type: String },
        image: { type: String },
        sortOrder: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

const ProjectCategory = mongoose.model("ProjectCategory", projectCategorySchema);

export default ProjectCategory;
