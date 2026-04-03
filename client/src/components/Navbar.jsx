import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dark, setDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: "🏠 Analyze" },
    { path: "/jd-matcher", label: "🎯 JD Match" },
    { path: "/cover-letter", label: "✉️ Cover Letter" },
    { path: "/roadmap", label: "🗺️ Roadmap" },
    { path: "/history", label: "📋 History" },
    { path: "/compare", label: "⚖️ Compare" },
    { path: "/tips", label: "💡 Tips" },
    { path: "/profile", label: "👤 Profile" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-black text-purple-500">
        {/* to='/' to redirect to home page */}
          🧠 ResumeAI
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                ${
                  location.pathname === link.path
                    ? "bg-purple-600 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-sm transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <span className="text-gray-500 dark:text-gray-400 text-sm hidden md:block">
            {localStorage.getItem("name")}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 py-1.5 rounded-lg text-sm transition"
          >
            Logout
          </button>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-sm"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 flex flex-wrap gap-2 px-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                ${
                  location.pathname === link.path
                    ? "bg-purple-600 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
