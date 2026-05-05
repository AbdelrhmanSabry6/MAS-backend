import { Router } from "express";
import * as teamController from "./team.controller.js";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";
import upload from "../../config/multerImage.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, upload.single("photo"), teamController.createTeamMember);
router.get("/", teamController.getAllTeamMembers);
router.put("/:id", requireAuth, requireAdmin, upload.single("photo"), teamController.updateTeamMember);
router.delete("/:id", requireAuth, requireAdmin, teamController.deleteTeamMember);

export default router;