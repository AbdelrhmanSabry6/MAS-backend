import { Router } from "express";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";
import * as tagController from "./tags.controller.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, tagController.createTag);
router.get("/", tagController.getAllTags);
router.put("/:id", requireAuth, requireAdmin, tagController.updateTag);
router.delete("/:id", requireAuth, requireAdmin, tagController.deleteTag);

export default router;