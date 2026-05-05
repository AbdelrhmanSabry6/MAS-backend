import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: { type: String },
        subject: { type: String },
        message: {
            type: String,
            required: true,
            maxlength: 5000,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

contactMessageSchema.index({ isRead: 1, createdAt: -1 });

const ContactMessage = mongoose.model(
    "ContactMessage",
    contactMessageSchema
);

export default ContactMessage;