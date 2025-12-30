import express from "express";
import { getTopProblems } from "../controllers/leetcodeController.js";

const router = express.Router();

router.get("/top", getTopProblems);

export default router;
