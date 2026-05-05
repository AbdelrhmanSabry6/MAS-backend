import mongoose from "mongoose";

const newsletterSubSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        confirmed: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

const NewsletterSub = mongoose.model("NewsletterSub", newsletterSubSchema);

export default NewsletterSub;
