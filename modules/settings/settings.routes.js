import { Router } from "express";
import { getSettings, updateSettings } from "./settings.controller.js";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getSettings);

router.put("/", requireAuth, requireAdmin, updateSettings);

export default router;