import Post from "../../databases/models/post.model.js";
import AppError from "../../utils/AppError.js";

// --- Media Library fields to populate on read operations ---
const MEDIA_POPULATES = ["featuredImageId"];

export const createPost = async (data) => {
    // Accept both formats:
    // - Legacy: { featuredImage: "/uploads/img.png" }
    // - New:    { featuredImageId: "64a..." }
    // Both can coexist on the same document during the migration period.
    const post = new Post(data);
    return await post.save()
};

export const deletePost = async (id) => {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
        throw new AppError("Post not found", 404);
    }
    return post;
};

export const updatePost = async (id, data) => {
    // Accept both legacy string URLs and new Media ObjectId references.
    const post = await Post.findByIdAndUpdate(id, data, { new: true });
    if (!post) {
        throw new AppError("Post not found", 404);
    }
    return post;
};

export const getAllPosts = async () => {
    return await Post.find()
        .populate("categoryId")
        .populate("featuredImage")
        .populate("authorId", "fullName email")
        .populate("tagIds")

        .sort({ createdAt: -1 });
};