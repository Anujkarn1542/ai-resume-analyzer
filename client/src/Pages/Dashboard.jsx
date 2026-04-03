import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.js";
import UploadBox from "../components/UploadBox.jsx";
import ScoreCard from "../components/ScoreCard.jsx";
import FeedbackSection from "../components/FeedbackSection.jsx";
import HistoryList from "../components/HistoryList.jsx";
import Navbar from "../components/Navbar.jsx";
import ATSScore from "../components/ATSScore.jsx";
import InterviewQuestions from "../components/InterviewQuestions.jsx";
import ImprovedBullets from "../components/ImprovedBullets.jsx";
import { exportToPDF } from "../utils/exportPDF.js";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("/resume/history");
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAnalyze = async () => {
    if (!file || !jobRole) {
      setError("Please upload a PDF and enter a job role!");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobRole", jobRole);
      const res = await axios.post("/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Resume Analyzer 🧠</h1>
          <p className="text-gray-400 mt-1">
            Upload your resume and get AI-powered feedback
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6"
        >
          <UploadBox onFileSelect={setFile} />
          {file && (
            <p className="text-green-400 text-sm mt-3">
              ✅ {file.name} selected
            </p>
          )}
          <div className="mt-4">
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">
              Target Job Role
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer, Backend Engineer..."
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition"
            />
          </div>
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "🤖 Analyzing your resume..." : "🚀 Analyze Resume"}
          </button>
        </motion.div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Export Button */}
            {/* <div className="flex justify-end">
              <button
                onClick={() => exportToPDF(result)}
                className="bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm transition"
              >
                📥 Export PDF Report
              </button>
            </div> */}
            {/* Export Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => exportToPDF(result)}
                className="bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm transition"
              >
                📥 Export PDF
              </button>
              <button
                onClick={async () => {
                  try {
                    await axios.post("/features/send-email", {
                      analysisId: result._id,
                    });
                    alert("✅ Report sent to your email!");
                  } catch {
                    alert("❌ Email sending failed!");
                  }
                }}
                className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-sm transition"
              >
                📧 Email Report
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScoreCard score={result.score} label={result.label} />
              <ATSScore atsScore={result.atsScore} />
            </div>

            <FeedbackSection
              strengths={result.strengths}
              weaknesses={result.weaknesses}
              suggestions={result.suggestions}
              missingKeywords={result.missingKeywords}
            />

            <ImprovedBullets bullets={result.improvedBullets} />
            <InterviewQuestions questions={result.interviewQuestions} />
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">📋 Past Analyses</h2>
            <HistoryList history={history} onSelect={setResult} />
          </div>
        )}
      </div>
    </div>
  );
}
