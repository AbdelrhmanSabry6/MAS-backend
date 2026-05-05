import {
    createAdminService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
} from "./admin.service.js";

export const createAdmin = async (req, res, next) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Full name, email and password are required",
            });
        }

        const finalRole = role || "admin";

        if (!["admin", "superAdmin"].includes(finalRole)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
            });
        }

        const user = await createAdminService({
            fullName,
            email,
            password,
            role: finalRole,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await getUserByIdService(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { fullName, email, password, role, isActive } = req.body;

        const updateData = {};

        if (fullName !== undefined) updateData.fullName = fullName;
        if (email !== undefined) updateData.email = email;
        if (password !== undefined) updateData.password = password;

        if (role !== undefined) {
            if (!["admin", "superAdmin"].includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid role",
                });
            }

            updateData.role = role;
        }

        if (isActive !== undefined) {
            if (typeof isActive !== "boolean") {
                return res.status(400).json({
                    success: false,
                    message: "isActive must be boolean",
                });
            }

            updateData.isActive = isActive;
        }

        const user = await updateUserService(id, updateData);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await deleteUserService(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};