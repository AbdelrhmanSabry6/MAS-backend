import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
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

        number: String,

        // Legacy fields - kept temporarily for old records/front-end compatibility
        icon: String,
        image: String,

        // Media Library references
        iconId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            default: null,
        },

        coverImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            default: null,
        },

        shortDescription: String,

        body: String,

        seo: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },

        sortOrder: {
            type: Number,
            default: 0,
        },

        published: {
            type: Boolean,
            default: true,
        },

        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

serviceSchema.index({ published: 1, sortOrder: 1 });

const Service = mongoose.model("Service", serviceSchema);

export default Service;