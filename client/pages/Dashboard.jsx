import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.get("/leetcode/top");
        setProblems(res.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Top LeetCode Problems
      </h1>

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
