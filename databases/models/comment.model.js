import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
        },
        body: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 5000,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            required: true,
            default: "pending",
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Recommended compound index
commentSchema.index({ postId: 1, status: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
