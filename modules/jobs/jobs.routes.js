import { Router } from "express";
import * as jobsController from "./jobs.controller.js";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, jobsController.create);
router.get("/", jobsController.getAll);
router.get("/:id", jobsController.getById);
router.put("/:id", requireAuth, requireAdmin, jobsController.update);
router.delete("/:id", requireAuth, requireAdmin, jobsController.remove);

export default router;
