import { motion } from "framer-motion";

export default function ATSScore({ atsScore }) {
  const color =
    atsScore >= 70 ? "#22c55e" : atsScore >= 40 ? "#eab308" : "#ef4444";

  const label =
    atsScore >= 70
      ? "ATS Friendly ✅"
      : atsScore >= 40
        ? "Needs Improvement ⚠️"
        : "ATS Unfriendly ❌";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
    >
      <h3 className="text-white font-semibold text-lg mb-4">🤖 ATS Score</h3>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#1f2937"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 40}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
              animate={{
                strokeDashoffset: 2 * Math.PI * 40 * (1 - atsScore / 100),
              }}
              transition={{ duration: 1, delay: 0.3 }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ color }} className="text-xl font-black">
              {atsScore}
            </span>
          </div>
        </div>
        <div>
          <p style={{ color }} className="font-semibold text-lg">
            {label}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {atsScore >= 70
              ? "Your resume is optimized for applicant tracking systems."
              : atsScore >= 40
                ? "Add more keywords and simplify formatting to pass ATS."
                : "Your resume may get rejected by ATS before a human sees it."}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 bg-gray-800 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${atsScore}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ backgroundColor: color }}
          className="h-2 rounded-full"
        />
      </div>
    </motion.div>
  );
}
