import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/leetcode/top");
        console.log("Dashboard response:", res.data);
        // The backend returns the data directly, not wrapped in a data property
        setProblems(res.data || []);
      } catch (err) {
        console.error("Error fetching problems:", err);
        console.error("Error details:", err.response?.data);
        setError(err.response?.data?.message || err.message || "Failed to fetch problems");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Top LeetCode Problems
      </h1>

      {loading && (
        <div className="text-center text-gray-400">Loading problems...</div>
      )}

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      {!loading && !error && problems.length === 0 && (
        <div className="text-center text-gray-400">No problems found.</div>
      )}

      <ul className="space-y-3">
        {problems.map((problem, index) => (
          <li
            key={index}
            className="bg-gray-800 p-4 rounded flex justify-between"
          >
            <span>{problem.title}</span>
            <span className="text-sm text-gray-400">
              {problem.difficulty}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
