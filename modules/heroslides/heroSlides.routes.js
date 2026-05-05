import { Router } from "express";
import upload from "../../config/multerImage.js";
import {
    createHeroSlide,
    getAllHeroSlides,
    getActiveHeroSlides,
    updateHeroSlide,
    deleteHeroSlide,
} from "./heroSlides.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

// Public
router.get("/active", getActiveHeroSlides);

// Admin
router.post("/", requireAuth, requireAdmin, upload.single("backgroundImage"), createHeroSlide);
router.get("/", requireAuth, requireAdmin, getAllHeroSlides);
router.put("/:id", requireAuth, requireAdmin, upload.single("backgroundImage"), updateHeroSlide);
router.delete("/:id", requireAuth, requireAdmin, deleteHeroSlide);

export default router;