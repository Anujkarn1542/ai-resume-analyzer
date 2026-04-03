import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [history, setHistory] = useState([]);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/resume/history").then((res) => setHistory(res.data));
  }, []);

  const avgScore = history.length
    ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length)
    : 0;

  const avgATS = history.length
    ? Math.round(
        history.reduce((a, b) => a + (b.atsScore || 0), 0) / history.length,
      )
    : 0;

  const best = history.length ? Math.max(...history.map((h) => h.score)) : 0;

  const stats = [
    { label: "Total Analyses", value: history.length, icon: "📊" },
    { label: "Average Score", value: avgScore, icon: "⭐" },
    { label: "Average ATS", value: avgATS, icon: "🤖" },
    { label: "Best Score", value: best, icon: "🏆" },
  ];

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "⚠️ This will permanently delete your account and all data!",
      )
    )
      return;
    try {
      await axios.delete("/features/account");
      localStorage.clear();
      navigate("/login");
    } catch {
      alert("Failed to delete account!");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 mb-8 flex items-center gap-6"
        >
          <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-3xl font-black text-white">
            {name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-400 mt-1">Resume Analyzer User</p>
            <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-3 py-1 rounded-full text-xs mt-2 inline-block">
              🚀 Active
            </span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 text-center"
            >
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-3xl font-black text-purple-500">
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">🕐 Recent Activity</h2>
          {history.length === 0 ? (
            <p className="text-gray-400 text-sm">No activity yet.</p>
          ) : (
            <div className="space-y-3">
              {history.slice(0, 5).map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{item.fileName}</p>
                    <p className="text-gray-400 text-xs">{item.jobRole}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        item.label === "Strong"
                          ? "text-green-400"
                          : item.label === "Average"
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {item.score}/100
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* ADD HERE */}
        <div className="mt-8 bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <h3 className="text-red-400 font-semibold mb-2">⚠️ Danger Zone</h3>
          <p className="text-gray-400 text-sm mb-4">
            Once deleted, your account and all data cannot be recovered.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            🗑️ Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}
