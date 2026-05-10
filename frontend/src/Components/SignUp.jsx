// src/components/SignUp.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      // ❗ IMPORTANT FIX (MERN AUTH FLOW)
      const token = res.data.token;

      if (!token) {
        setError("Token not received from backend");
        return;
      }

      // ✅ STORE TOKEN (VERY IMPORTANT)
      localStorage.setItem("token", token);

      // optional user storage
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));

      // ✅ REDIRECT TO DASHBOARD
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-cyan-400 to-purple-700">

      <div className="text-center mb-6 text-white px-4">
        <h1 className="text-4xl font-bold mb-2">
          Create Your Account 🚀
        </h1>

        <p className="text-lg text-gray-100">
          Start tracking your expenses and take control of your finances.
        </p>
      </div>

      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign Up
        </h3>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3 mb-6 text-center">
            {error}
          </div>
        )}

        {/* NAME */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

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
          Sign Up
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;