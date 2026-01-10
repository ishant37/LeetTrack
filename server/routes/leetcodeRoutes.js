import express from "express";
import {
  getTopProblems,
  getPost,
  getUserStats,
  syncUserLeetCodeData,
} from "../controllers/leetcodeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/top", getTopProblems);
router.get("/post/:postId", getPost);
router.get("/user/:username", getUserStats);
router.post("/sync", protect, syncUserLeetCodeData);

export default router;
