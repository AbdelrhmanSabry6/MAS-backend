import { Router } from "express";
import {
    createProject,
    updateProject,
    getProjects,
    deleteProject,
} from "./projects.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";
import upload from "../../config/multerImage.js";

const router = Router();

router.post(
    "/",
    requireAuth,
    requireAdmin,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]),
    createProject
);

router.put(
    "/:id",
    requireAuth,
    requireAdmin,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]),
    updateProject
);

router.get("/", getProjects);

router.delete("/:id", requireAuth, requireAdmin, deleteProject);

export default router;