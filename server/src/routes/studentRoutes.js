import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  getStudentDashboardStats,
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/profile", protect, authorize("student"), getStudentProfile);
router.put("/profile", protect, authorize("student"), updateStudentProfile);
router.get("/dashboard-stats", protect, authorize("student"), getStudentDashboardStats);

export default router;
