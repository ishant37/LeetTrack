import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
      <Link to="/dashboard" className="text-2xl font-bold text-green-400">
        🎯 LeetTrack
      </Link>
      <div className="flex gap-4 items-center">
        {user && (
          <>
            <span className="text-gray-300 text-sm">
              Welcome, <span className="text-green-400 font-semibold">{user.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
