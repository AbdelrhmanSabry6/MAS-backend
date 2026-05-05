import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../databases/models/user.model.js";
import AppError from "../../utils/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const loginService = async ({ email, password }) => {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    console.log("LOGIN EMAIL:", normalizedEmail);
    console.log("FOUND USER:", user);
    console.log("PASSWORD HASH:", user?.passwordHash);
    console.log("PLAIN PASSWORD:", password);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    if (!user.isActive) {
        throw new AppError("Your account is disabled", 403);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
        throw new AppError("Invalid email or password", 401);
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            lastLoginAt: user.lastLoginAt,
        },
    };
};