import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";

export default function Roadmap() {
  const [form, setForm] = useState({
    currentSkills: "",
    targetRole: "",
    timeframe: "3",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!form.currentSkills || !form.targetRole) {
      setError("Please fill all fields!");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axios.post("/features/roadmap", form);
      setResult(res.data);
    } catch (err) {
      setError("Roadmap generation failed!");
    }
    setLoading(false);
  };

  const phaseColors = [
    "border-purple-500/30 bg-purple-500/5",
    "border-blue-500/30 bg-blue-500/5",
    "border-green-500/30 bg-green-500/5",
  ];

  const phaseTitleColors = [
    "text-purple-400",
    "text-blue-400",
    "text-green-400",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Career Roadmap 🗺️</h1>
          <p className="text-gray-400 mt-1">
            Get a personalized learning roadmap to your dream job
          </p>
        </motion.div>

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6 space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              🎯 Target Role
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer, Full Stack Engineer..."
              value={form.targetRole}
              onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              💻 Current Skills
            </label>
            <textarea
              rows={4}
              placeholder="e.g. HTML, CSS, basic JavaScript, some React..."
              value={form.currentSkills}
              onChange={(e) =>
                setForm({ ...form, currentSkills: e.target.value })
              }
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition resize-none text-sm"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              ⏱️ Timeframe
            </label>
            <select
              value={form.timeframe}
              onChange={(e) => setForm({ ...form, timeframe: e.target.value })}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
            >
              <option value="1">1 Month</option>
              <option value="2">2 Months</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 mb-8"
        >
          {loading ? "🗺️ Building your roadmap..." : "🚀 Generate Roadmap"}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="bg-purple-600 rounded-2xl p-6 text-white text-center">
              <h2 className="text-2xl font-black">{result.title}</h2>
              <p className="text-purple-200 mt-2">{result.finalGoal}</p>
            </div>

            {/* Phases */}
            {result.phases?.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`border rounded-2xl p-6 ${phaseColors[i % phaseColors.length]}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className={`text-lg font-bold ${phaseTitleColors[i % phaseTitleColors.length]}`}
                  >
                    {phase.phase}
                  </h3>
                  <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs">
                    {phase.duration}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-2">
                      Goals
                    </p>
                    <ul className="space-y-1">
                      {phase.goals?.map((goal, j) => (
                        <li
                          key={j}
                          className="text-gray-700 dark:text-gray-300 text-sm flex gap-2"
                        >
                          <span
                            className={
                              phaseTitleColors[i % phaseTitleColors.length]
                            }
                          >
                            →
                          </span>{" "}
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-2">
                      Resources
                    </p>
                    <ul className="space-y-1">
                      {phase.resources?.map((r, j) => (
                        <li
                          key={j}
                          className="text-gray-700 dark:text-gray-300 text-sm flex gap-2"
                        >
                          <span className="text-yellow-400">📚</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-400 text-xs uppercase mb-1">
                      🏆 Milestone
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {phase.milestone}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Tips */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h3 className="text-yellow-400 font-semibold mb-3">
                💡 Pro Tips
              </h3>
              <ul className="space-y-2">
                {result.tips?.map((tip, i) => (
                  <li
                    key={i}
                    className="text-gray-600 dark:text-gray-300 text-sm flex gap-2"
                  >
                    <span className="text-yellow-400">✓</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
