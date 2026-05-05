import ContactMessage from "../../databases/models/contactMessage.model.js";
import AppError from "../../utils/AppError.js";

export const createMessage = async (data) => {
    const message = new ContactMessage(data);
    return await message.save();
};

export const getMessages = async () => {
    return await ContactMessage.find().sort({ createdAt: -1 });
};

export const getMessageById = async (id) => {
    const message = await ContactMessage.findById(id);

    if (!message) {
        throw new AppError("Message not found", 404);
    }

    return message;
};

export const markAsRead = async (id) => {
    const message = await ContactMessage.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
    );

    if (!message) {
        throw new AppError("Message not found", 404);
    }

    return message;
};

export const deleteMessage = async (id) => {
    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
        throw new AppError("Message not found", 404);
    }

    return message;
};

export const getMessagesStats = async () => {
    const total = await ContactMessage.countDocuments();
    const unread = await ContactMessage.countDocuments({ isRead: false });

    return { total, unread };
};