import { Router } from "express";

import {
    createAdmin,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "./admin.controller.js";

import {
    requireAuth,
    requireSuperAdmin,
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, requireSuperAdmin, createAdmin);

router.get("/", requireAuth, requireSuperAdmin, getAllUsers);

router.get("/:id", requireAuth, requireSuperAdmin, getUserById);

router.put("/:id", requireAuth, requireSuperAdmin, updateUser);

router.delete("/:id", requireAuth, requireSuperAdmin, deleteUser);

export default router;