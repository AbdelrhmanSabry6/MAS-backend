import { Router } from "express";
import { createPage, updatePage, deletePage, getPage, getAllPages } from "./pages.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";
import upload from "../../config/multerImage.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, upload.single("heroImage"), createPage);
router.put("/:id", requireAuth, requireAdmin, upload.single("heroImage"), updatePage);
router.delete("/:id", requireAuth, requireAdmin, deletePage);
router.get("/:id", getPage);
router.get("/", getAllPages);




export default router;
