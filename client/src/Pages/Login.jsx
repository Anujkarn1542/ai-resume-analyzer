import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🧠 ResumeAI
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Analyze your resume with AI
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl transition-colors duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Welcome back
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-gray-600 dark:text-gray-400 text-sm mb-1 block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-600 dark:text-gray-400 text-sm mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-900 px-4 text-gray-600 dark:text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <a
            href="https://ai-resume-analyzer-api-93tn.onrender.com/api/auth/google"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-300 transition"
          >
            <img
              src="https://www.google.com/favicon.ico"
              className="w-5 h-5"
              alt="Google"
            />
            Continue with Google
          </a>

          {/* Register */}
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-500 hover:text-purple-400"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
