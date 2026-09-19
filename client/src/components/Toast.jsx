import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

let toastFn = null;

export const toast = {
  success: (msg) => toastFn?.("success", msg),
  error: (msg) => toastFn?.("error", msg),
  info: (msg) => toastFn?.("info", msg),
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastFn = (type, message) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };
    return () => {
      toastFn = null;
    };
  }, []);

  const icons = { success: "✅", error: "❌", info: "ℹ️" };
  const colors = {
    success: "bg-green-500/10 border-green-500/30 text-green-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`border rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2 shadow-lg min-w-64 ${colors[t.type]}`}
          >
            <span>{icons[t.type]}</span>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
