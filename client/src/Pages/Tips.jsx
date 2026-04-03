import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const tips = [
  {
    category: "📝 Content Tips",
    color: "border-purple-500/30 bg-purple-500/5",
    titleColor: "text-purple-400",
    items: [
      'Use strong action verbs: "Built", "Developed", "Optimized", "Led"',
      'Quantify achievements: "Reduced load time by 40%" not "Improved performance"',
      "Keep resume to 1 page for freshers, 2 pages max for experienced",
      "Tailor your resume for each job role you apply to",
      "Put most relevant experience at the top",
    ],
  },
  {
    category: "🤖 ATS Optimization",
    color: "border-green-500/30 bg-green-500/5",
    titleColor: "text-green-400",
    items: [
      "Use standard section headings: Education, Experience, Skills, Projects",
      "Avoid tables, columns, graphics — ATS cannot read them",
      "Include keywords from the job description in your resume",
      "Use standard fonts: Arial, Calibri, Times New Roman",
      "Save as PDF but also keep a .docx version",
    ],
  },
  {
    category: "💻 For IT/Developer Resumes",
    color: "border-blue-500/30 bg-blue-500/5",
    titleColor: "text-blue-400",
    items: [
      "Always include a GitHub profile link with active contributions",
      'List tech stack for each project: "React + Node.js + MongoDB"',
      'Mention deployment: "Deployed on Vercel with CI/CD"',
      "Include DSA achievements: LeetCode rating, contests solved",
      "Add live project links — recruiters click them!",
    ],
  },
  {
    category: "🎯 Common Mistakes to Avoid",
    color: "border-red-500/30 bg-red-500/5",
    titleColor: "text-red-400",
    items: [
      'Never use "Responsible for" — use action verbs instead',
      'Avoid generic objectives like "Seeking a challenging position"',
      "Don't list every technology you've ever touched",
      'Remove outdated skills like "MS Office" unless required',
      "Proofread — spelling errors immediately disqualify you",
    ],
  },
];

export default function Tips() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Resume Tips 💡</h1>
          <p className="text-gray-400 mt-1">
            Expert advice to make your resume stand out
          </p>
        </motion.div>

        <div className="space-y-6">
          {tips.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border rounded-2xl p-6 ${section.color}`}
            >
              <h2 className={`text-xl font-bold mb-4 ${section.titleColor}`}>
                {section.category}
              </h2>
              <ul className="space-y-3">
                {section.items.map((tip, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                    className="flex gap-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className={section.titleColor}>✓</span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 bg-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-2">
            Ready to Apply These Tips?
          </h2>
          <p className="text-purple-200 mb-4">
            Analyze your updated resume and see your score improve!
          </p>
          <a
            href="/dashboard"
            className="bg-white text-purple-600 font-bold px-6 py-3 rounded-xl inline-block hover:bg-gray-100 transition"
          >
            Analyze My Resume →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
