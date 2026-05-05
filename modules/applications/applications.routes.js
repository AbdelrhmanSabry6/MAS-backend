import { Router } from "express";
import * as applicationController from "./applications.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";
import uploadCv from "../../config/multerCv.js";

const router = Router();

// public apply (مع رفع CV)
router.post("/", uploadCv.single("cv"), applicationController.apply);

// admin
router.get("/", requireAuth, requireAdmin, applicationController.getAll);
router.get("/:id", requireAuth, requireAdmin, applicationController.getById);
router.put("/:id/status", requireAuth, requireAdmin, applicationController.changeStatus);
router.delete("/:id", requireAuth, requireAdmin, applicationController.remove);

export default router;