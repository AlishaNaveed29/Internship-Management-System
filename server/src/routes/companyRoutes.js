import express from "express";
import {
  createCompany,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createCompanyRules, updateCompanyRules } from "../middleware/validate.js";

const router = express.Router();

router.post("/profile", protect, authorize("company"), createCompanyRules, createCompany);
router.get("/profile", protect, authorize("company"), getCompanyProfile);
router.put("/profile", protect, authorize("company"), updateCompanyRules, updateCompanyProfile);

export default router;
