import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        passwordHash: {
            type: String,
            required: [true, "Password is required"],
        },

        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },

        role: {
            type: String,
            enum: ["superAdmin", "admin"],
            default: "admin",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        lastLoginAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;