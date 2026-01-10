import express from "express";
import {
  register,
  login,
  getProfile,
  updateLeetCodeUsername,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/leetcode-username", protect, updateLeetCodeUsername);

export default router;
