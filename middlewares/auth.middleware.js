import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized: No token provided", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return next(new AppError("Unauthorized: Invalid or expired token", 401));
    }
};

export const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return next(new AppError("Unauthorized: User not logged in", 401));
    }

    if (!["admin", "superAdmin"].includes(req.user.role)) {
        return next(new AppError("Forbidden: Admin access required", 403));
    }

    next();
};

export const requireSuperAdmin = (req, res, next) => {
    if (!req.user) {
        return next(new AppError("Unauthorized: User not logged in", 401));
    }

    if (req.user.role !== "superAdmin") {
        return next(new AppError("Forbidden: Super admin access required", 403));
    }

    next();
};