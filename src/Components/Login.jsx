import React, { useState } from "react";
import { login } from "../api";
import { jwtDecode } from "jwt-decode";

function Login({ onLogin, onSwitchToRegister }) {
  const [user, setUser] = useState({ username: "", passwordHash: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.username.trim() || !user.passwordHash.trim()) {
      setError("Username and password are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(user);

      if (res && typeof res.token === "string") {
        localStorage.setItem("token", res.token);

        // Decode JWT and extract UserId
        const decoded = jwtDecode(res.token);
        const userId = decoded?.UserId || decoded?.userId;
        console.log("Logged in UserId:", userId);

        localStorage.setItem("userId", userId);
        localStorage.setItem("username", user.username);

        setUser({ username: "", passwordHash: "" });
        onLogin();
      } else {
        throw new Error("Invalid token received from server.");
      }
    } catch (err) {
      console.error("Login error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Invalid username or password";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-serif">
        Login
      </h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={user.passwordHash}
            onChange={(e) => setUser({ ...user, passwordHash: e.target.value })}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 ease-in-out shadow-md flex items-center justify-center cursor-pointer ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 hover:shadow-lg hover:scale-[1.01]"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={onSwitchToRegister}
          className="text-blue-600 hover:underline font-medium cursor-pointer"
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
