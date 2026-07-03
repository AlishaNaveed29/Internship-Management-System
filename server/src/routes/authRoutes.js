import express from "express";
import {
  healthCheck,
  register,
  login,
} from "../controllers/authController.js";
import { registerRules, loginRules } from "../middleware/validate.js";

const router = express.Router();

router.get("/health", healthCheck);
router.post("/register", registerRules, register);
router.post("/login", loginRules, login);

export default router;
