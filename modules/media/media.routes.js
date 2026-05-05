import { Router } from "express";
import upload from "../../config/multerImage.js";
import { uploadMedia, getAllMedia, deleteMedia, } from "./media.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/upload", requireAuth, requireAdmin, upload.single("image"), uploadMedia);

router.get("/", getAllMedia);

router.delete("/:id", requireAuth, requireAdmin, deleteMedia);

export default router;