// src/components/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ IMPORTANT: store JWT token
      const token = res.data.token;

      if (!token) {
        setError("Token missing from backend response");
        return;
      }

      localStorage.setItem("token", token); // 🔥 REQUIRED FOR MERN AUTH

      // optional user data
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));

      // ✅ REDIRECT TO DASHBOARD
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-cyan-400 to-purple-700">

      <div className="text-center mb-6 text-white">
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-lg text-gray-100">
          Please login to access your expense dashboard
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3 mb-6 text-center">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-cyan-400 to-purple-700 hover:scale-[1.02] transition-all duration-300 shadow-lg"
        >
          Login
        </button>

        {/* SIGNUP LINK */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up first
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;