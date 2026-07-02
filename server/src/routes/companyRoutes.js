import express from "express";
import {
  createCompany,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/profile", protect, authorize("company"), createCompany);
router.get("/profile", protect, authorize("company"), getCompanyProfile);
router.put("/profile", protect, authorize("company"), updateCompanyProfile);

export default router;
