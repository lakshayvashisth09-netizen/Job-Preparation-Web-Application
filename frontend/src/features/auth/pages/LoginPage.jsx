import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({
      email,
      password
    });

    navigate("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              name="email"
              className="border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm mb-1">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              name="password"
              className="border rounded-md px-3 py-2"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md 
            transition-all duration-300 ease-in-out
            hover:scale-105 hover:bg-blue-600 active:scale-95"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>

      </div>

    </main>
  );
};

export default LoginPage;