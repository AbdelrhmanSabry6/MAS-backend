import bcrypt from "bcryptjs";
import User from "../../databases/models/user.model.js";

export const createAdminService = async ({ fullName, email, password, role }) => {
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email: normalizedEmail,
        passwordHash,
        role: role || "admin",
    });

    const userObject = user.toObject();
    delete userObject.passwordHash;

    return userObject;
};

export const getAllUsersService = async () => {
    return await User.find()
        .select("-passwordHash")
        .sort({ createdAt: -1 });
};

export const getUserByIdService = async (id) => {
    return await User.findById(id).select("-passwordHash");
};

export const updateUserService = async (id, data) => {
    const updateData = { ...data };

    if (updateData.email) {
        updateData.email = updateData.email.toLowerCase().trim();
    }

    if (updateData.password) {
        updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
        delete updateData.password;
    }

    return await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    }).select("-passwordHash");
};

export const deleteUserService = async (id) => {
    return await User.findByIdAndDelete(id).select("-passwordHash");
};