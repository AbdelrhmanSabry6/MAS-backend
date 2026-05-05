import { Router } from "express";
import {
    createService,
    deleteService,
    getAllServices,
    updateService,
} from "./services.controller.js";

import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";
import upload from "../../config/multerImage.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, upload.single("coverImage"), createService);

router.put("/:id", requireAuth, requireAdmin, upload.single("coverImage"), updateService);

router.delete("/:id", requireAuth, requireAdmin, deleteService);

router.get("/", getAllServices);



export default router;