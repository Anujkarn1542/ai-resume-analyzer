// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "../utils/axios";
// import Navbar from "../components/Navbar";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function History() {
//   const [history, setHistory] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Replace your useEffect with this:
//   useEffect(() => {
//     axios
//       .get("/resume/history")
//       .then((res) => {
//         const data = res.data?.history || res.data;
//         setHistory(Array.isArray(data) ? data : []);
//       })
//       .catch(() => setHistory([]))
//       .finally(() => setLoading(false));
//   }, []);

//   const chartData = [...history].reverse().map((item, i) => ({
//     name: `#${i + 1}`,
//     score: item.score,
//     ats: item.atsScore,
//   }));

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this analysis?")) return;
//     try {
//       await axios.delete(`/features/analysis/${id}`);
//       setHistory((prev) => prev.filter((h) => h._id !== id));
//     } catch {
//       alert("Delete failed!");
//     }
//   };

//   const handleDeleteAll = async () => {
//     if (!window.confirm("Delete ALL history? This cannot be undone!")) return;
//     try {
//       await axios.delete("/features/analysis-all");
//       setHistory([]);
//     } catch {
//       alert("Delete failed!");
//     }
//   };
//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
//       <Navbar />
//       <div className="max-w-4xl mx-auto px-4 py-10">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           {/* <h1 className="text-3xl font-bold">Analysis History 📋</h1>
//           <p className="text-gray-400 mt-1">
//             Track your resume improvement over time
//           </p> */}
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-bold">Analysis History 📋</h1>
//               <p className="text-gray-400 mt-1">
//                 Track your resume improvement
//               </p>
//             </div>
//             {history.length > 0 && (
//               <button
//                 onClick={handleDeleteAll}
//                 className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm transition"
//               >
//                 🗑️ Clear All
//               </button>
//             )}
//           </div>
//         </motion.div>

//         {/* Chart */}
//         {history.length > 1 && (
//           <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8">
//             <h3 className="font-semibold mb-4">📈 Score Progress</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis dataKey="name" stroke="#9ca3af" />
//                 <YAxis domain={[0, 100]} stroke="#9ca3af" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#111827",
//                     border: "1px solid #374151",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="score"
//                   stroke="#a855f7"
//                   strokeWidth={2}
//                   dot={{ fill: "#a855f7", r: 4 }}
//                   name="Resume Score"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="ats"
//                   stroke="#22c55e"
//                   strokeWidth={2}
//                   dot={{ fill: "#22c55e", r: 4 }}
//                   name="ATS Score"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         )}

//         {/* History List */}
//         {loading ? (
//           <p className="text-gray-400 text-center py-10">Loading...</p>
//         ) : history.length === 0 ? (
//           <p className="text-gray-400 text-center py-10">
//             No analyses yet. Upload your resume to get started!
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {history.map((item, i) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 onClick={() =>
//                   setSelected(selected?._id === item._id ? null : item)
//                 }
//                 className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-500 rounded-xl p-4 cursor-pointer transition"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium">{item.fileName}</p>
//                     <p className="text-gray-400 text-xs mt-1">
//                       {item.jobRole} •{" "}
//                       {new Date(item.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p
//                       className={`text-2xl font-black ${
//                         item.label === "Strong"
//                           ? "text-green-400"
//                           : item.label === "Average"
//                             ? "text-yellow-400"
//                             : "text-red-400"
//                       }`}
//                     >
//                       {item.score}
//                     </p>
//                     <p className="text-gray-400 text-xs">
//                       ATS: {item.atsScore}
//                     </p>

//                     {/* ADD DELETE BUTTON HERE */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDelete(item._id);
//                       }}
//                       className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2 py-1 rounded-lg text-xs transition mt-2"
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 </div>

//                 {/* Expanded */}
//                 {selected?._id === item._id && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2"
//                   >
//                     <p className="text-green-400 text-sm font-medium">
//                       Strengths:
//                     </p>
//                     {item.strengths?.map((s, i) => (
//                       <p key={i} className="text-gray-400 text-xs">
//                         • {s}
//                       </p>
//                     ))}
//                     <p className="text-red-400 text-sm font-medium mt-2">
//                       Weaknesses:
//                     </p>
//                     {item.weaknesses?.map((w, i) => (
//                       <p key={i} className="text-gray-400 text-xs">
//                         • {w}
//                       </p>
//                     ))}
//                   </motion.div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";
import PageLoader from "../components/PageLoader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function History() {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/resume/history")
      .then((res) => {
        const data = res.data?.history || res.data;
        setHistory(Array.isArray(data) ? data : []);
      })
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  const chartData = [...history].reverse().map((item, i) => ({
    name: `#${i + 1}`,
    score: item.score,
    ats: item.atsScore,
  }));

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this analysis?")) return;
    try {
      await axios.delete(`/features/analysis/${id}`);
      setHistory((prev) => prev.filter((h) => h._id !== id));
    } catch {
      alert("Delete failed!");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Delete ALL history? This cannot be undone!")) return;
    try {
      await axios.delete("/features/analysis-all");
      setHistory([]);
    } catch {
      alert("Delete failed!");
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Analysis History 📋</h1>
            <p className="text-gray-400 mt-1">
              Track your resume improvement over time
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm transition"
            >
              🗑️ Clear All
            </button>
          )}
        </motion.div>

        {/* Empty State */}
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-6xl mb-4">📭</p>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              No analyses yet
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Upload your resume on the dashboard to get started!
            </p>
            <a
              href="/dashboard"
              className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Analyze Resume →
            </a>
          </motion.div>
        ) : (
          <>
            {/* Chart */}
            {history.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8"
              >
                <h3 className="font-semibold mb-4">📈 Score Progress</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis domain={[0, 100]} stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111827",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#a855f7"
                      strokeWidth={2}
                      dot={{ fill: "#a855f7", r: 4 }}
                      name="Resume Score"
                    />
                    <Line
                      type="monotone"
                      dataKey="ats"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ fill: "#22c55e", r: 4 }}
                      name="ATS Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* History List */}
            <div className="space-y-3">
              {history.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() =>
                    setSelected(selected?._id === item._id ? null : item)
                  }
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-500 rounded-xl p-4 cursor-pointer transition"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="font-medium text-sm truncate">
                        {item.fileName}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {item.jobRole} •{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
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
                        <p className="text-gray-400 text-xs">
                          ATS: {item.atsScore}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id);
                        }}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg text-xs transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Expanded */}
                  {selected?._id === item._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2"
                    >
                      <p className="text-green-400 text-sm font-medium">
                        Strengths:
                      </p>
                      {item.strengths?.map((s, i) => (
                        <p key={i} className="text-gray-400 text-xs pl-2">
                          • {s}
                        </p>
                      ))}
                      <p className="text-red-400 text-sm font-medium mt-3">
                        Weaknesses:
                      </p>
                      {item.weaknesses?.map((w, i) => (
                        <p key={i} className="text-gray-400 text-xs pl-2">
                          • {w}
                        </p>
                      ))}
                      {item.missingKeywords?.length > 0 && (
                        <>
                          <p className="text-yellow-400 text-sm font-medium mt-3">
                            Missing Keywords:
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.missingKeywords.map((k, i) => (
                              <span
                                key={i}
                                className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-2 py-0.5 rounded-full text-xs"
                              >
                                {k}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}