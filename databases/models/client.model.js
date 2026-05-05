import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        // --- Legacy string field (kept for backward compatibility) ---
        // Stores a direct URL string (e.g. "/uploads/logo.png").
        logo: { type: String },

        // --- New Media Library reference ---
        // References the Media model for richer image metadata.
        // TODO: Once all records are migrated and the frontend exclusively
        //       uses the Media reference, the legacy string field above
        //       can be removed in a future cleanup pass.
        logoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
        },

        description: { type: String },
        year: { type: Number },
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

const Client = mongoose.model("Client", clientSchema);

export default Client;
