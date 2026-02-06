import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchUsername.trim()) {
      setError("Please enter a LeetCode username");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setUserData(null);
      
      const res = await api.get(`/leetcode/user/${searchUsername}`);
      console.log("User data:", res.data);
      setUserData(res.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(
        err.response?.data?.message || 
        "Failed to fetch user data. Please check if the username is correct."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-400">
          🔍 Search LeetCode User Statistics
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4 max-w-2xl">
            <input
              type="text"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              placeholder="Enter LeetCode username (e.g., jacksmith)"
              className="flex-1 p-3 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded mb-6 max-w-2xl">
            ❌ {error}
          </div>
        )}

        {/* User Data Display */}
        {userData && (
          <div className="space-y-6 max-w-4xl">
            {/* Profile Section */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                👤 User Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.profile?.userAvatar && (
                  <div className="col-span-full flex items-center gap-4">
                    <img
                      src={userData.profile.userAvatar}
                      alt={userData.username}
                      className="w-20 h-20 rounded-full border-2 border-green-400"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {userData.username}
                      </h3>
                      {userData.profile?.realName && (
                        <p className="text-gray-400">{userData.profile.realName}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {userData.profile?.ranking && (
                  <div className="bg-gray-900 p-4 rounded">
                    <p className="text-gray-400 text-sm mb-1">Global Ranking</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      #{userData.profile.ranking.toLocaleString()}
                    </p>
                  </div>
                )}

                {userData.profile?.reputation && (
                  <div className="bg-gray-900 p-4 rounded">
                    <p className="text-gray-400 text-sm mb-1">Reputation</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {userData.profile.reputation.toLocaleString()}
                    </p>
                  </div>
                )}

                {userData.profile?.countryName && (
                  <div className="bg-gray-900 p-4 rounded">
                    <p className="text-gray-400 text-sm mb-1">Country</p>
                    <p className="text-lg font-semibold">{userData.profile.countryName}</p>
                  </div>
                )}

                {userData.profile?.company && (
                  <div className="bg-gray-900 p-4 rounded">
                    <p className="text-gray-400 text-sm mb-1">Company</p>
                    <p className="text-lg font-semibold">{userData.profile.company}</p>
                  </div>
                )}
              </div>

              {userData.profile?.aboutMe && (
                <div className="mt-4 p-4 bg-gray-900 rounded">
                  <p className="text-gray-400 text-sm mb-2">About</p>
                  <p className="text-white">{userData.profile.aboutMe}</p>
                </div>
              )}

              {userData.profile?.skillTags && userData.profile.skillTags.length > 0 && (
                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {userData.profile.skillTags.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Problems Solved Section */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                📊 Problems Solved
              </h2>
              
              {userData.solvedProblems && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-purple-200 mb-1">Total Solved</p>
                    <p className="text-3xl font-bold text-white">
                      {userData.solvedProblems.total || 0}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-600 to-green-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-green-200 mb-1">Easy</p>
                    <p className="text-3xl font-bold text-white">
                      {userData.solvedProblems.easy || 0}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-yellow-200 mb-1">Medium</p>
                    <p className="text-3xl font-bold text-white">
                      {userData.solvedProblems.medium || 0}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-600 to-red-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-red-200 mb-1">Hard</p>
                    <p className="text-3xl font-bold text-white">
                      {userData.solvedProblems.hard || 0}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Submission Stats */}
            {userData.submitStats && (
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-green-400">
                  📈 Submission Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.submitStats.acSubmissionNum?.map((item, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded flex justify-between items-center">
                      <span className="text-gray-400">{item.difficulty}</span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-400">
                          {item.count.toLocaleString()} <span className="text-sm text-gray-500">accepted</span>
                        </p>
                        {userData.submitStats.totalSubmissionNum && (
                          <p className="text-sm text-gray-500">
                            / {userData.submitStats.totalSubmissionNum.find(
                              (sub) => sub.difficulty === item.difficulty
                            )?.count.toLocaleString() || 0} total
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Badges */}
            {userData.badges && userData.badges.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-green-400">
                  🏆 Badges
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userData.badges.map((badge, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded text-center">
                      {badge.icon && (
                        <img
                          src={badge.icon}
                          alt={badge.displayName}
                          className="w-16 h-16 mx-auto mb-2"
                        />
                      )}
                      <p className="text-sm font-semibold">{badge.displayName}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !userData && (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-lg">👆 Enter a LeetCode username above to view their statistics</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
