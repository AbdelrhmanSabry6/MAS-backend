import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
        },

        // Media Library reference
        heroImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            default: null,
        },

        sections: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        seo: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: { createdAt: false, updatedAt: true },
    }
);

const Page = mongoose.model("Page", pageSchema);

export default Page;