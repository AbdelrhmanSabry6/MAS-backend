import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            trim: true,
        },
        excerpt: { type: String },
        body: { type: String },

        // --- Legacy string field (kept for backward compatibility) ---
        // Stores a direct URL string (e.g. "/uploads/image.png").
        // Remains functional so existing records and frontend code
        // continue to work without changes.

        // --- New Media Library reference ---
        // References the Media model for richer image metadata.
        // TODO: Once all records are migrated and the frontend exclusively
        //       uses the Media reference, the legacy string field above
        //       can be removed in a future cleanup pass.
        featuredImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            default: null
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BlogCategory",
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        tagIds: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
            default: [],
        },
        isPublished: {
            type: Boolean,
            required: true,
            default: false,
        },
        publishedAt: { type: Date },
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
postSchema.index({ isPublished: 1, publishedAt: -1 });
postSchema.index({ tagIds: 1 });

const Post = mongoose.model("Post", postSchema);

export default Post;
