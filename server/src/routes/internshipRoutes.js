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

const router = express.Router();

router.get("/", getInternships);
router.get("/my", protect, authorize("company"), getMyInternships);
router.get("/:id", getInternship);
router.post("/", protect, authorize("company"), createInternship);
router.put("/:id", protect, authorize("company"), updateInternship);
router.delete("/:id", protect, authorize("company"), deleteInternship);

export default router;
