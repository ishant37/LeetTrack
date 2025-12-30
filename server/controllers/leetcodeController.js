import axios from "axios";

export const getTopProblems = async (req, res) => {
  try {
    const response = await axios.get(
      "https://leetcode-api1.p.rapidapi.com/cpcs",
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching LeetCode data:", error.message);
    res.status(500).json({
      message: "Failed to fetch LeetCode data ishant",
    });
  }
};
