import axios from "axios";

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
