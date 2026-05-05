import { Router } from "express";
import { createPost, deletePost, getAllPosts, updatePost } from "./posts.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";
import upload from "../../config/multerImage.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, upload.single("featuredImage"), createPost);
router.delete("/:id", requireAuth, requireAdmin, deletePost);
router.put("/:id", requireAuth, requireAdmin, upload.single("featuredImage"), updatePost);
router.get("/", requireAuth, requireAdmin, getAllPosts);

export default router;
