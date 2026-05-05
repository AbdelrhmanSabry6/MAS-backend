import { Router } from "express";
import * as messagesController from "./messages.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();


router.post("/contact", messagesController.create);


router.get("/", requireAuth, requireAdmin, messagesController.getAll);
router.get("/stats", requireAuth, requireAdmin, messagesController.stats);
router.get("/:id", requireAuth, requireAdmin, messagesController.getById);
router.put("/:id/read", requireAuth, requireAdmin, messagesController.markRead);
router.delete("/:id", requireAuth, requireAdmin, messagesController.remove);

export default router;