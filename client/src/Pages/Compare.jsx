import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";

export default function Compare() {
  const [history, setHistory] = useState([]);
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/resume/history").then((res) => setHistory(res.data));
  }, []);

  const handleCompare = async () => {
    if (!v1 || !v2 || v1 === v2) {
      setError("Please select two different analyses!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/features/compare/${v1}/${v2}`);
      setResult(res.data);
    } catch (err) {
      setError("Comparison failed!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Version Comparison ⚖️</h1>
          <p className="text-gray-400 mt-1">
            Compare two resume analyses side by side
          </p>
        </motion.div>

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">
                Version 1 (Older)
              </label>
              <select
                value={v1}
                onChange={(e) => setV1(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
              >
                <option value="">Select analysis...</option>
                {history.map((h) => (
                  <option key={h._id} value={h._id}>
                    {h.fileName} — Score: {h.score} (
                    {new Date(h.createdAt).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">
                Version 2 (Newer)
              </label>
              <select
                value={v2}
                onChange={(e) => setV2(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
              >
                <option value="">Select analysis...</option>
                {history.map((h) => (
                  <option key={h._id} value={h._id}>
                    {h.fileName} — Score: {h.score} (
                    {new Date(h.createdAt).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            onClick={handleCompare}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Comparing..." : "⚖️ Compare Versions"}
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Improvement Banner */}
            <div
              className={`rounded-2xl p-6 text-center border ${
                result.improved
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}
            >
              <p className="text-4xl mb-2">{result.improved ? "🚀" : "📉"}</p>
              <p
                className={`text-2xl font-black ${result.improved ? "text-green-400" : "text-red-400"}`}
              >
                {result.improved ? "Resume Improved!" : "Score Decreased"}
              </p>
              <p
                className={`text-lg mt-1 ${result.improved ? "text-green-400" : "text-red-400"}`}
              >
                Score change: {result.scoreDiff > 0 ? "+" : ""}
                {result.scoreDiff} points
              </p>
              {result.atsDiff !== 0 && (
                <p className="text-gray-400 text-sm mt-1">
                  ATS change: {result.atsDiff > 0 ? "+" : ""}
                  {result.atsDiff} points
                </p>
              )}
            </div>

            {/* Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Version 1",
                  data: result.version1,
                  color: "border-gray-500/30",
                },
                {
                  label: "Version 2",
                  data: result.version2,
                  color: "border-purple-500/30",
                },
              ].map(({ label, data, color }) => (
                <div
                  key={label}
                  className={`bg-gray-50 dark:bg-gray-900 border ${color} rounded-2xl p-6`}
                >
                  <h3 className="font-semibold text-lg mb-4">{label}</h3>
                  <p className="text-gray-400 text-xs mb-3">{data.fileName}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Score</span>
                      <span className="text-purple-400 font-bold">
                        {data.score}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">ATS Score</span>
                      <span className="text-green-400 font-bold">
                        {data.atsScore}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Label</span>
                      <span
                        className={`font-bold ${
                          data.label === "Strong"
                            ? "text-green-400"
                            : data.label === "Average"
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {data.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Job Role</span>
                      <span className="text-white text-sm">{data.jobRole}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-green-400 text-xs font-medium mb-2">
                      Strengths:
                    </p>
                    {data.strengths?.slice(0, 2).map((s, i) => (
                      <p key={i} className="text-gray-400 text-xs">
                        • {s}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
