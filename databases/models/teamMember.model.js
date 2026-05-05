import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        position: { type: String },

        // --- Legacy string field (kept for backward compatibility) ---
        // Stores a direct URL string (e.g. "/uploads/photo.png").
        photo: { type: String },

        // --- New Media Library reference ---
        // References the Media model for richer image metadata.
        // TODO: Once all records are migrated and the frontend exclusively
        //       uses the Media reference, the legacy string field above
        //       can be removed in a future cleanup pass.
        photoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
        },

        bio: { type: String },
        social: {
            type: mongoose.Schema.Types.Mixed, // {linkedin, twitter, ...}
            required: true,
        },
        sortOrder: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
