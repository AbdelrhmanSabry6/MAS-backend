import Media from "../../databases/models/media.model.js";
import AppError from "../../utils/AppError.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
import cloudinary from "../../config/cloudinary.js";

export const createMedia = async (file, alt = "") => {
    const uploaded = await uploadToCloudinary(file.buffer, "mas/media");

    const media = new Media({
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        type: file.mimetype,
        size: file.size,
        width: uploaded.width,
        height: uploaded.height,
        alt: alt || file.originalname,
    });

    return await media.save();
};

export const getAllMedia = async (search) => {
    const query = {};

    if (search) {
        query.$or = [
            { url: { $regex: search, $options: "i" } },
            { alt: { $regex: search, $options: "i" } },
        ];
    }

    return await Media.find(query).sort({ createdAt: -1 });
};

export const deleteMedia = async (id) => {
    const media = await Media.findById(id);

    if (!media) {
        throw new AppError("Media not found", 404);
    }

    // Delete from Cloudinary
    if (media.publicId) {
        await cloudinary.uploader.destroy(media.publicId);
    }

    await Media.findByIdAndDelete(id);

    return media;
};