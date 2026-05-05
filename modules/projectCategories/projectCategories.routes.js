import { Router } from "express";
import * as projectCategoriesController from "./projectCategories.controller.js";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, projectCategoriesController.create);
router.get("/", projectCategoriesController.getAll);
router.put("/:id", requireAuth, requireAdmin, projectCategoriesController.update);
router.delete("/:id", requireAuth, requireAdmin, projectCategoriesController.remove);

export default router;