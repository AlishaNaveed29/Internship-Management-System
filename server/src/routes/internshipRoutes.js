import express from "express";
import {
  createInternship,
  getInternships,
  getInternship,
  getMyInternships,
  updateInternship,
  deleteInternship,
} from "../controllers/internshipController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createInternshipRules, updateInternshipRules } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getInternships);
router.get("/my", protect, authorize("company"), getMyInternships);
router.get("/:id", getInternship);
router.post("/", protect, authorize("company"), createInternshipRules, createInternship);
router.put("/:id", protect, authorize("company"), updateInternshipRules, updateInternship);
router.delete("/:id", protect, authorize("company"), deleteInternship);

export default router;
