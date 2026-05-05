import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
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

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
