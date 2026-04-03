import { motion } from "framer-motion";

const Section = ({ title, color, items, isKeywords }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
  >
    <h3 className={`font-semibold text-lg mb-4 ${color}`}>{title}</h3>
    {isKeywords ? (
      <div className="flex flex-wrap gap-2">
        {items?.map((k, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded-full text-xs"
          >
            {k}
          </motion.span>
        ))}
      </div>
    ) : (
      <ul className="space-y-2">
        {items?.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-gray-300 text-sm flex gap-2"
          >
            <span className={color}>•</span> {s}
          </motion.li>
        ))}
      </ul>
    )}
  </motion.div>
);

export default function FeedbackSection({
  strengths,
  weaknesses,
  suggestions,
  missingKeywords,
}) {
  return (
    <div className="space-y-4">
      <Section title="✅ Strengths" color="text-green-400" items={strengths} />
      <Section title="⚠️ Weaknesses" color="text-red-400" items={weaknesses} />
      <Section
        title="🔑 Missing Keywords"
        color="text-yellow-400"
        items={missingKeywords}
        isKeywords
      />
      <Section
        title="💡 Suggestions"
        color="text-blue-400"
        items={suggestions}
      />
    </div>
  );
}
