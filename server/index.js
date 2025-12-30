import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import leetcodeRoutes from "./routes/leetcodeRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/leetcode", leetcodeRoutes);

app.get("/", (req, res) => {
  res.send("LeetTrack Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log("Loaded API Key:", process.env.RAPIDAPI_KEY);