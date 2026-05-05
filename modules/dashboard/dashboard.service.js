import Project from "../../databases/models/project.model.js";
import Post from "../../databases/models/post.model.js";
import Comment from "../../databases/models/comment.model.js";
import JobApplication from "../../databases/models/jobApplication.model.js";
import ContactMessage from "../../databases/models/contactMessage.model.js";
import NewsletterSub from "../../databases/models/newsletterSub.model.js";

export const getDashboardStats = async () => {
    const [
        projects,
        blogPosts,
        pendingComments,
        newApplications,
        unreadMessages,
        newsletterSubs,
    ] = await Promise.all([
        Project.countDocuments(),
        Post.countDocuments(),
        Comment.countDocuments({ status: "pending" }),
        JobApplication.countDocuments({ status: "new" }),
        ContactMessage.countDocuments({ isRead: false }),
        NewsletterSub.countDocuments(),
    ]);

    return {
        projects,
        blogPosts,
        pendingComments,
        newApplications,
        unreadMessages,
        newsletterSubs,
    };
};