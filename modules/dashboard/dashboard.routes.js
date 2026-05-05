import { Router } from "express";
import { getDashboardStats } from "./dashboard.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, requireAdmin, getDashboardStats);

export default router;