import { Router } from "express";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";
import { createBlogCategory, getAllBlogCategories, updateBlogCategory, deleteBlogCategory } from "./blogCategories.controller.js";


const router = Router();

router.post("/", requireAuth, requireAdmin, createBlogCategory);
router.get("/", requireAuth, requireAdmin, getAllBlogCategories);
router.put("/:id", requireAuth, requireAdmin, updateBlogCategory);
router.delete("/:id", requireAuth, requireAdmin, deleteBlogCategory);

export default router;
