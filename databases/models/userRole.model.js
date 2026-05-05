import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        role: {
            type: String,
            enum: ["admin", "editor", "author", "user"],
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false }, // only createdAt per spec
    }
);

// Compound unique index — one role per user at most once
userRoleSchema.index({ userId: 1, role: 1 }, { unique: true });

const UserRole = mongoose.model("UserRole", userRoleSchema);

export default UserRole;
