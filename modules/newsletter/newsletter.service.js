import NewsletterSub from "../../databases/models/newsletterSub.model.js";
import AppError from "../../utils/AppError.js";

// subscribe
export const subscribe = async (email) => {
    const exists = await NewsletterSub.findOne({ email });

    if (exists) {
        return exists;
    }

    const sub = new NewsletterSub({ email });
    return await sub.save();
};

// get all
export const getSubscribers = async () => {
    return await NewsletterSub.find().sort({ createdAt: -1 });
};

// delete
export const deleteSubscriber = async (id) => {
    const sub = await NewsletterSub.findByIdAndDelete(id);

    if (!sub) throw new AppError("Subscriber not found", 404);

    return sub;
};