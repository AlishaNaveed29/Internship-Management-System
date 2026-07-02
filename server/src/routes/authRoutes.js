import express from "express";
import {
  healthCheck,
  register,
  login,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/health", healthCheck);
router.post("/register", register);
router.post("/login", login);

export default router;