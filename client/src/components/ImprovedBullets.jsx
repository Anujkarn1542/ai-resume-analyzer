import { motion } from "framer-motion";
import { useState } from "react";

export default function ImprovedBullets({ bullets }) {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, i) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
    >
      <h3 className="text-white font-semibold text-lg mb-2">
        ✍️ AI-Improved Bullet Points
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        Click copy to use these improved versions in your resume!
      </p>
      <div className="space-y-3">
        {bullets?.map((bullet, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex justify-between items-start gap-3"
          >
            <p className="text-gray-300 text-sm flex-1">
              <span className="text-purple-400 mr-2">▸</span>
              {bullet}
            </p>
            <button
              onClick={() => handleCopy(bullet, i)}
              className="text-xs bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-400 px-3 py-1.5 rounded-lg transition flex-shrink-0"
            >
              {copied === i ? "✅ Copied!" : "📋 Copy"}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
