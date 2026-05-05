import { Router } from "express";
import * as timelineController from "./timeline.controller.js";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, timelineController.createTimelineEvent);
router.get("/", timelineController.getTimelineEvents);
router.put("/:id", requireAuth, requireAdmin, timelineController.updateTimelineEvent);
router.delete("/:id", requireAuth, requireAdmin, timelineController.deleteTimelineEvent);

export default router;