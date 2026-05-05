import { Router } from "express";
import * as commentsController from "./comments.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

// public
router.post("/", commentsController.create);

// admin
router.get("/", requireAuth, requireAdmin, commentsController.getAll);
router.put("/:id/status", requireAuth, requireAdmin, commentsController.changeStatus);
router.delete("/:id", requireAuth, requireAdmin, commentsController.remove);

export default router;