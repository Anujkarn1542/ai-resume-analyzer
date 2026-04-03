import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";

export default function JDMatcher() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMatch = async () => {
    if (!resumeText || !jobDescription) {
      setError("Please fill both fields!");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axios.post("/features/jd-match", {
        resumeText,
        jobDescription,
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Matching failed!");
    }
    setLoading(false);
  };

  const verdictColor =
    result?.verdict === "Strong Match"
      ? "text-green-400"
      : result?.verdict === "Partial Match"
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">JD Matcher 🎯</h1>
          <p className="text-gray-400 mt-1">
            Compare your resume against any job description
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block font-medium">
              📄 Your Resume Text
            </label>
            <textarea
              rows={12}
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition resize-none text-sm"
            />
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block font-medium">
              💼 Job Description
            </label>
            <textarea
              rows={12}
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition resize-none text-sm"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleMatch}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 mb-8"
        >
          {loading ? "🤖 Analyzing match..." : "🎯 Match Resume to JD"}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Match Score */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
                Match Score
              </p>
              <p className="text-8xl font-black text-purple-500">
                {result.matchScore}
              </p>
              <p className={`text-xl font-semibold mt-2 ${verdictColor}`}>
                {result.verdict}
              </p>

              {/* Progress Bar */}
              <div className="mt-6 bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.matchScore}%` }}
                  transition={{ duration: 1 }}
                  className="h-3 rounded-full bg-purple-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Keywords */}
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="text-green-400 font-semibold mb-3">
                  ✅ Matched Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matchedKeywords?.map((k, i) => (
                    <span
                      key={i}
                      className="bg-green-500/10 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="text-red-400 font-semibold mb-3">
                  ❌ Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords?.map((k, i) => (
                    <span
                      key={i}
                      className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h3 className="text-blue-400 font-semibold mb-3">
                💡 How to Improve Match
              </h3>
              <ul className="space-y-2">
                {result.tips?.map((tip, i) => (
                  <li
                    key={i}
                    className="text-gray-600 dark:text-gray-300 text-sm flex gap-2"
                  >
                    <span className="text-blue-400">•</span> {tip}
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
