import { Router } from "express";
import * as departmentsController from "./Departments.controller.js";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, departmentsController.create);
router.get("/", departmentsController.getAll);

router.put("/:id", requireAuth, requireAdmin, departmentsController.update);
router.delete("/:id", requireAuth, requireAdmin, departmentsController.remove);

export default router;