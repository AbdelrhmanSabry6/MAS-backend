import { Router } from "express";
import * as countriesController from "./countries.controller.js";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, countriesController.createCountry);
router.get("/", countriesController.getCountries);
router.put("/:id", requireAuth, requireAdmin, countriesController.updateCountry);
router.delete("/:id", requireAuth, requireAdmin, countriesController.deleteCountry);

export default router;