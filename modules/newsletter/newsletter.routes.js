import { Router } from "express";
import * as newsletterController from "./newsletter.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

// public
router.post("/", newsletterController.create);

router.get("/export", requireAuth, requireAdmin, newsletterController.exportCSV);

// admin
router.get("/", requireAuth, requireAdmin, newsletterController.getAll);
router.delete("/:id", requireAuth, requireAdmin, newsletterController.remove);

export default router;