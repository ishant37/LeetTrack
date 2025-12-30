import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white outline-none"
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded">
          Register
        </button>

        <p className="text-gray-400 mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
