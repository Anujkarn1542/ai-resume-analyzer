import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";

export default function CoverLetter() {
  const [form, setForm] = useState({
    resumeText: "",
    jobDescription: "",
    companyName: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!form.resumeText || !form.jobDescription || !form.companyName) {
      setError("Please fill all fields!");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axios.post("/features/cover-letter", form);
      setResult(res.data.coverLetter);
    } catch (err) {
      setError(err.response?.data?.message || "Generation failed!");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <h1 className="text-3xl font-bold">Cover Letter Generator ✉️</h1>
          <p className="text-gray-400 mt-1">
            AI writes a tailored cover letter for your target role
          </p>
        </motion.div>

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6 space-y-4">
          <div>
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">
              🏢 Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. Google, Microsoft, Startup XYZ"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition"
            />
          </div>
          <div>
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">
              📄 Your Resume Text
            </label>
            <textarea
              rows={6}
              placeholder="Paste your resume text here..."
              value={form.resumeText}
              onChange={(e) => setForm({ ...form, resumeText: e.target.value })}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition resize-none text-sm"
            />
          </div>
          <div>
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">
              💼 Job Description
            </label>
            <textarea
              rows={6}
              placeholder="Paste the job description here..."
              value={form.jobDescription}
              onChange={(e) =>
                setForm({ ...form, jobDescription: e.target.value })
              }
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition resize-none text-sm"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 mb-8"
        >
          {loading
            ? "✍️ Writing your cover letter..."
            : "✉️ Generate Cover Letter"}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold text-lg">
                  ✉️ Your Cover Letter
                </h3>
                <button
                  onClick={handleCopy}
                  className="bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-lg text-sm transition"
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap border border-gray-200 dark:border-gray-700">
                {result}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
