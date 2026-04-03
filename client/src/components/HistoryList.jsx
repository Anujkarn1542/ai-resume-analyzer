import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function HistoryList({ history, onSelect }) {
  // Prepare chart data
  const chartData = [...history].reverse().map((item, i) => ({
    name: `#${i + 1}`,
    score: item.score,
    role: item.jobRole,
  }));

  return (
    <div className="space-y-6">
      {/* Score Chart */}
      {history.length > 1 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">📈 Score Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis
                domain={[0, 100]}
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#a855f7" }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ fill: "#a855f7", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* History Items */}
      <div className="space-y-3">
        {history.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(item)}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-purple-500 transition"
          >
            <div>
              <p className="text-white font-medium text-sm">{item.fileName}</p>
              <p className="text-gray-400 text-xs mt-1">
                {item.jobRole} • {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-2xl font-black ${
                  item.label === "Strong"
                    ? "text-green-400"
                    : item.label === "Average"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {item.score}
              </p>
              <p
                className={`text-xs ${
                  item.label === "Strong"
                    ? "text-green-400"
                    : item.label === "Average"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {item.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
