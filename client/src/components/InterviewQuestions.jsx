import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewQuestions({ questions }) {
  const [revealed, setRevealed] = useState([]);

  const toggle = (i) => {
    setRevealed((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
    >
      <h3 className="text-white font-semibold text-lg mb-4">
        🎯 Interview Questions
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        AI-generated questions based on your resume. Click to reveal!
      </p>
      <div className="space-y-3">
        {questions?.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => toggle(i)}
            className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-purple-500 rounded-xl p-4 cursor-pointer transition"
          >
            <div className="flex justify-between items-center">
              <span className="text-purple-400 font-semibold text-sm">
                Q{i + 1}
              </span>
              <span className="text-gray-400 text-xs">
                {revealed.includes(i) ? "▲ Hide" : "▼ Reveal"}
              </span>
            </div>
            <AnimatePresence>
              {revealed.includes(i) && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-white text-sm mt-2"
                >
                  {q}
                </motion.p>
              )}
            </AnimatePresence>
            {!revealed.includes(i) && (
              <p className="text-gray-500 text-sm mt-1 blur-sm select-none">
                Click to reveal this question
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
