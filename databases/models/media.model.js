import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        publicId: { type: String, required: true },
        type: { type: String }, // mime type
        size: { type: Number }, // bytes
        width: { type: Number },
        height: { type: Number },
        alt: { type: String },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;
