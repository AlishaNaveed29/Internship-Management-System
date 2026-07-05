import { Router } from "express";
import {
  apply,
  getMyApplications,
  getCompanyApplications,
  updateStatus,
} from "../controllers/applicationController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/my", protect, authorize("student"), getMyApplications);
router.get("/company", protect, authorize("company"), getCompanyApplications);
router.post("/:id/apply", protect, authorize("student"), apply);
router.put("/:id/status", protect, authorize("company"), updateStatus);

export default router;
