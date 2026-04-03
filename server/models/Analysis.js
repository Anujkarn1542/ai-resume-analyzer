import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: String,
    jobRole: String,
    score: Number,
    label: String,
    atsScore: Number,
    strengths: [String],
    weaknesses: [String],
    missingKeywords: [String],
    suggestions: [String],
    improvedBullets: [String],
    interviewQuestions: [String],
  },
  { timestamps: true },
);

export default mongoose.model("Analysis", analysisSchema);
