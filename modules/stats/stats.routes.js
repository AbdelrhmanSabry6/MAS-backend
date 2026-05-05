import { Router } from "express";
import * as statsController from "./stats.controller.js";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, statsController.createStat);
router.get("/", statsController.getStats);
router.put("/:id", requireAuth, requireAdmin, statsController.updateStat);
router.delete("/:id", requireAuth, requireAdmin, statsController.deleteStat);

export default router;