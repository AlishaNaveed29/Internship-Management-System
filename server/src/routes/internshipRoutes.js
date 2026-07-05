import { Router } from "express";
import {
  getInternships,
  getMyInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
} from "../controllers/internshipController.js";
import { protect, authorize } from "../middleware/auth.js";
import { internshipValidation } from "../middleware/validate.js";

const router = Router();

router.get("/", getInternships);
router.get("/my", protect, authorize("company"), getMyInternships);
router.get("/:id", getInternship);
router.post("/", protect, authorize("company"), internshipValidation, createInternship);
router.put("/:id", protect, authorize("company"), updateInternship);
router.delete("/:id", protect, authorize("company"), deleteInternship);

export default router;
