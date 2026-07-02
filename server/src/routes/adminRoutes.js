import express from "express";
import {
  getUsers,
  getCompanies,
  getAdminInternships,
  getAdminApplications,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/users", protect, authorize("admin"), getUsers);
router.get("/companies", protect, authorize("admin"), getCompanies);
router.get("/internships", protect, authorize("admin"), getAdminInternships);
router.get("/applications", protect, authorize("admin"), getAdminApplications);

export default router;
