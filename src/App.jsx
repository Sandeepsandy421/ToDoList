import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Swal from "sweetalert2";
import Auth from "./Components/Auth";
import TaskList from "./Components/TaskList";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername || "User");
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "User");
    setIsLoggedIn(true);
    navigate("/taskform");
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      navigate("/login");
      Swal.fire(
        "Logged out",
        "You have been successfully logged out.",
        "success"
      );
    }
  };

  const Layout = () => (
    <>
      <nav className="bg-blue-800 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-xl font-semibold text-white">ToDo App</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-white text-blue-800 rounded-full flex items-center justify-center font-semibold">
                  {username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-medium">Hi, {username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-800 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 shadow-sm font-medium"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col space-y-2 pt-2 border-t border-blue-700">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-white text-blue-800 rounded-full flex items-center justify-center font-semibold">
                  {username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-medium">Hi, {username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-800 px-4 py-2 rounded-md transition duration-200 w-full text-left font-medium hover:bg-gray-100 shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="w-full mx-auto">
        <TaskList onLogout={handleLogout} />
      </main>
    </>
  );

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/todoapp" : "/login"} />}
        />
        <Route path="/login" element={<Auth onLogin={handleLogin} />} />
        <Route path="/register" element={<Auth onLogin={handleLogin} />} />
        <Route
          path="/todoapp"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
