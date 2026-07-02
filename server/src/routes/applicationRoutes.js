import express from "express";
import {
  applyInternship,
  myApplications,
  getCompanyApplications,
  updateApplicationStatus,
  getAllApplications,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/my", protect, authorize("student"), myApplications);
router.get("/company", protect, authorize("company"), getCompanyApplications);
router.post("/:id/apply", protect, authorize("student"), applyInternship);
router.put("/:id/status", protect, authorize("company", "admin"), updateApplicationStatus);
router.get("/", protect, authorize("admin"), getAllApplications);

export default router;
