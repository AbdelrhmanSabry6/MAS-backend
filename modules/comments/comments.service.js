import Comment from "../../databases/models/comment.model.js";
import AppError from "../../utils/AppError.js";

// user create
export const createComment = async (data) => {
    const comment = new Comment(data);
    return await comment.save();
};

// admin get
export const getComments = async (query) => {
    const { status } = query;

    let filter = {};
    if (status && status !== "all") {
        filter.status = status;
    }

    return await Comment.find(filter)
        .populate("postId", "title")
        .sort({ createdAt: -1 });
};

// change status
export const updateStatus = async (id, status) => {
    const comment = await Comment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    if (!comment) throw new AppError("Comment not found", 404);

    return comment;
};

// delete
export const deleteComment = async (id) => {
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) throw new AppError("Comment not found", 404);

    return comment;
};