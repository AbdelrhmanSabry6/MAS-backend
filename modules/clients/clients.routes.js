import { Router } from "express";
import {
    createClient,
    updateClient,
    deleteClient,
    getAllClients,
    getClientById,
} from "./clients.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";
import upload from "../../config/multerImage.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, upload.single("logo"), createClient);
router.put("/:id", requireAuth, requireAdmin, upload.single("logo"), updateClient);

router.delete("/:id", requireAuth, requireAdmin, deleteClient);

router.get("/", getAllClients);
router.get("/:id", getClientById);

export default router;