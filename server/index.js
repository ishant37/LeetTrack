import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import leetcodeRoutes from "./routes/leetcodeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("LeetTrack Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});