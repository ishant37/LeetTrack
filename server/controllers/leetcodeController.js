import axios from "axios";
import { LeetCode } from "leetcode-query";
import User from "../models/User.js";

const leetcode = new LeetCode();

export const getTopProblems = async (req, res) => {
  try {
    const response = await axios.get(
      `https://${process.env.RAPIDAPI_HOST}/problems`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      }
    );

    console.log("API Response:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching LeetCode data:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    res.status(500).json({
      message: "Failed to fetch LeetCode data",
      error: error.response?.data || error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const response = await axios.get(
      `https://${process.env.RAPIDAPI_HOST}/posts/${postId}`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      }
    );

    console.log("Post Response:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching post data:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    res.status(500).json({
      message: "Failed to fetch post data",
      error: error.response?.data || error.message,
    });
  }
};

// @desc    Get LeetCode user profile and stats
// @route   GET /api/leetcode/user/:username
// @access  Public
export const getUserStats = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Fetch user data from LeetCode
    const user = await leetcode.user(username);

    if (!user) {
      return res.status(404).json({ message: "LeetCode user not found" });
    }

    // Format the response
    const userData = {
      username: user.matchedUser?.username,
      profile: {
        realName: user.matchedUser?.profile?.realName,
        userAvatar: user.matchedUser?.profile?.userAvatar,
        ranking: user.matchedUser?.profile?.ranking,
        reputation: user.matchedUser?.profile?.reputation,
        aboutMe: user.matchedUser?.profile?.aboutMe,
        school: user.matchedUser?.profile?.school,
        websites: user.matchedUser?.profile?.websites,
        countryName: user.matchedUser?.profile?.countryName,
        company: user.matchedUser?.profile?.company,
        skillTags: user.matchedUser?.profile?.skillTags,
      },
      submitStats: {
        acSubmissionNum: user.matchedUser?.submitStats?.acSubmissionNum,
        totalSubmissionNum: user.matchedUser?.submitStats?.totalSubmissionNum,
      },
      solvedProblems: {
        easy:
          user.matchedUser?.submitStats?.acSubmissionNum?.find(
            (item) => item.difficulty === "Easy"
          )?.count || 0,
        medium:
          user.matchedUser?.submitStats?.acSubmissionNum?.find(
            (item) => item.difficulty === "Medium"
          )?.count || 0,
        hard:
          user.matchedUser?.submitStats?.acSubmissionNum?.find(
            (item) => item.difficulty === "Hard"
          )?.count || 0,
        total:
          user.matchedUser?.submitStats?.acSubmissionNum?.find(
            (item) => item.difficulty === "All"
          )?.count || 0,
      },
      badges: user.matchedUser?.badges,
      upcomingBadges: user.matchedUser?.upcomingBadges,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching LeetCode user stats:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      message: "Failed to fetch LeetCode user stats",
      error: error.message,
    });
  }
};

// @desc    Sync LeetCode data for authenticated user
// @route   POST /api/leetcode/sync
// @access  Private
export const syncUserLeetCodeData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.leetcodeUsername) {
      return res.status(400).json({
        message: "Please set your LeetCode username first",
      });
    }

    // Fetch user data from LeetCode
    const leetcodeData = await leetcode.user(user.leetcodeUsername);

    if (!leetcodeData || !leetcodeData.matchedUser) {
      return res.status(404).json({
        message: "LeetCode user not found. Please check your username.",
      });
    }

    // Update user's LeetCode data
    user.leetcodeData = {
      profile: {
        ranking: leetcodeData.matchedUser?.profile?.ranking,
        reputation: leetcodeData.matchedUser?.profile?.reputation,
        avatar: leetcodeData.matchedUser?.profile?.userAvatar,
      },
      submitStats: {
        acSubmissionNum: leetcodeData.matchedUser?.submitStats?.acSubmissionNum,
        totalSubmissionNum:
          leetcodeData.matchedUser?.submitStats?.totalSubmissionNum,
      },
      solvedProblems: {
        easy:
          leetcodeData.matchedUser?.submitStats?.acSubmissionNum?.find(
            (item) => item.difficulty === "Easy"
          )?.count || 0,
        medium:
          leetcodeData.matchedUser?.submitStats?.acSubmissionNum?.find(
            (item) => item.difficulty === "Medium"
          )?.count || 0,
        hard:
          leetcodeData.matchedUser?.submitStats?.acSubmissionNum?.find(
            (item) => item.difficulty === "Hard"
          )?.count || 0,
        total:
          leetcodeData.matchedUser?.submitStats?.acSubmissionNum?.find(
            (item) => item.difficulty === "All"
          )?.count || 0,
      },
      lastSynced: new Date(),
    };

    await user.save();

    res.status(200).json({
      message: "LeetCode data synced successfully",
      leetcodeData: user.leetcodeData,
    });
  } catch (error) {
    console.error("Error syncing LeetCode data:", error);
    res.status(500).json({
      message: "Failed to sync LeetCode data",
      error: error.message,
    });
  }
};
