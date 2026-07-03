import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  getStudentDashboardStats,
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { updateStudentRules } from "../middleware/validate.js";

const router = express.Router();

router.get("/profile", protect, authorize("student"), getStudentProfile);
router.put("/profile", protect, authorize("student"), updateStudentRules, updateStudentProfile);
router.get("/dashboard-stats", protect, authorize("student"), getStudentDashboardStats);

export default router;
