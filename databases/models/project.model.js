import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
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
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProjectCategory",
        },

        // --- Legacy string fields (kept for backward compatibility) ---
        // These store direct URL strings (e.g. "/uploads/image.png").
        // They remain functional so existing records and frontend code
        // continue to work without changes.
        coverImage: { type: String },
        gallery: {
            type: [String],
            required: true,
            default: [],
        },

        // --- New Media Library references ---
        // These reference the Media model and allow the frontend to
        // access the full media object (url, alt, dimensions, etc.).
        // During the migration period, both fields may coexist.
        // TODO: Once all records are migrated and the frontend exclusively
        //       uses the Media references, the legacy string fields above
        //       can be removed in a future cleanup pass.
        coverImageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
        },
        galleryIds: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
            default: [],
        },

        client: { type: String },
        location: { type: String },
        year: { type: Number },
        scope: { type: String },
        services: { type: String },
        status: { type: String }, // e.g. Completed, In Progress, Planning
        body: { type: String }, // rich text / HTML
        isFeatured: {
            type: Boolean,
            required: true,
            default: false,
        },
        isPublished: {
            type: Boolean,
            required: true,
            default: true,
        },
        sortOrder: {
            type: Number,
            required: true,
            default: 0,
        },
        seo: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

// Recommended indexes
projectSchema.index({ categoryId: 1 });
projectSchema.index({ isPublished: 1, isFeatured: 1 });

const Project = mongoose.model("Project", projectSchema);

export default Project;
