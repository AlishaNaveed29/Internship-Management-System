import { Router } from "express";
import { getUsers, getCompanies, getInternships, getApplications, getStats } from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/stats", protect, authorize("admin"), getStats);
router.get("/users", protect, authorize("admin"), getUsers);
router.get("/companies", protect, authorize("admin"), getCompanies);
router.get("/internships", protect, authorize("admin"), getInternships);
router.get("/applications", protect, authorize("admin"), getApplications);

export default router;
