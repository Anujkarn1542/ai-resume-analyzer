import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Analysis",
    desc: "Gemini AI analyzes your resume and gives detailed feedback instantly.",
  },
  {
    icon: "🎯",
    title: "ATS Score",
    desc: "Know exactly how well your resume passes Applicant Tracking Systems.",
  },
  {
    icon: "✍️",
    title: "Improved Bullet Points",
    desc: "AI rewrites your weak bullet points to sound more impactful.",
  },
  {
    icon: "🎤",
    title: "Interview Questions",
    desc: "Get AI-generated interview questions based on your resume.",
  },
  {
    icon: "📥",
    title: "PDF Export",
    desc: "Download your complete analysis report as a PDF.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    desc: "Track your resume improvement over time with charts.",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const { dark, setDark } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <span className="text-2xl font-black text-purple-500">🧠 ResumeAI</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-sm transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-500 dark:text-gray-400 hover:text-purple-500 text-sm font-medium transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium">
            🚀 Powered by Gemini AI
          </span>
          <h1 className="text-5xl md:text-6xl font-black mt-6 mb-6 leading-tight">
            Get Your Resume
            <span className="text-purple-500"> AI-Reviewed </span>
            in Seconds
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Upload your resume, enter your target role, and get instant AI
            feedback on score, ATS compatibility, missing keywords, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              Analyze My Resume →
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              Login
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-6 mt-20"
        >
          {[
            { number: "10x", label: "Faster than manual review" },
            { number: "6+", label: "AI-powered features" },
            { number: "100%", label: "Free to use" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
            >
              <p className="text-4xl font-black text-purple-500">
                {stat.number}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black">Everything You Need</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            All features to land your dream job
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition"
            >
              <span className="text-4xl">{f.icon}</span>
              <h3 className="text-lg font-semibold mt-3 mb-2">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-purple-600 rounded-3xl p-12">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-purple-200 mb-8">
            Start analyzing your resume for free today.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-purple-500 font-black">🧠 ResumeAI</span>
          <p className="text-gray-400 text-sm">
            Built with ❤️ using MERN + Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}
