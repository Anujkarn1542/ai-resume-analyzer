import { motion } from "framer-motion";

export default function ScoreCard({ score, label }) {
  const color =
    label === "Strong"
      ? "#22c55e"
      : label === "Average"
        ? "#eab308"
        : "#ef4444";

  const bgColor =
    label === "Strong"
      ? "border-green-500/30 bg-green-500/5"
      : label === "Average"
        ? "border-yellow-500/30 bg-yellow-500/5"
        : "border-red-500/30 bg-red-500/5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`border rounded-2xl p-8 text-center ${bgColor}`}
    >
      <p className="text-gray-400 mb-2 text-sm uppercase tracking-widest">
        Resume Score
      </p>
      <motion.p
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        style={{ color }}
        className="text-8xl font-black"
      >
        {score}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span
          style={{ color, borderColor: color }}
          className="border px-4 py-1 rounded-full text-sm font-semibold mt-3 inline-block"
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
