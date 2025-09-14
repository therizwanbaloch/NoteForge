import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);
        navigate("/");
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md
                        sm:p-8 sm:shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg
                         hover:bg-indigo-700 transition font-semibold text-lg"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-700 mt-6 text-sm sm:text-base">
            Don't Have An Account?{" "}
            <Link className="text-indigo-500 hover:underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
