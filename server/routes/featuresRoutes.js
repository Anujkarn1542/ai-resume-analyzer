import "../config.js";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { protect } from "../middleware/authMiddleware.js";
import Analysis from "../models/Analysis.js";
import User from "../models/User.js";
import { sendAnalysisEmail } from "../utils/sendEmail.js";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ 1. JD Matcher
router.post("/jd-match", protect, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(`
      Compare this resume with the job description.
      Return ONLY valid JSON, no markdown, no backticks:
      {
        "matchScore": (0-100),
        "matchedKeywords": ["keyword1", "keyword2"],
        "missingKeywords": ["keyword1", "keyword2"],
        "verdict": ("Strong Match" or "Partial Match" or "Weak Match"),
        "tips": ["tip1", "tip2", "tip3"]
      }
      Resume: ${resumeText}
      Job Description: ${jobDescription}
    `);
    const raw = result.response.text();
    const cleaned = raw.replace(/\`\`\`json|\`\`\`/g, "").trim();
    res.json(JSON.parse(cleaned));
  } catch (err) {
    res.status(500).json({ message: "JD Match failed", error: err.message });
  }
});

// ✅ 2. Cover Letter Generator
router.post("/cover-letter", protect, async (req, res) => {
  try {
    const { resumeText, jobDescription, companyName } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(`
      Write a professional cover letter for this candidate.
      Company: ${companyName}
      Job Description: ${jobDescription}
      Resume: ${resumeText}
      
      Return ONLY valid JSON, no markdown, no backticks:
      {
        "coverLetter": "Full cover letter text here..."
      }
    `);
    const raw = result.response.text();
    const cleaned = raw.replace(/\`\`\`json|\`\`\`/g, "").trim();
    res.json(JSON.parse(cleaned));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Cover letter generation failed", error: err.message });
  }
});

// ✅ 3. Career Roadmap Generator
router.post("/roadmap", protect, async (req, res) => {
  try {
    const { currentSkills, targetRole, timeframe } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(`
      Create a personalized career roadmap.
      Target Role: ${targetRole}
      Current Skills: ${currentSkills}
      Timeframe: ${timeframe} months
      
      Return ONLY valid JSON, no markdown, no backticks:
      {
        "title": "Roadmap title",
        "phases": [
          {
            "phase": "Phase 1 title",
            "duration": "Days 1-30",
            "goals": ["goal1", "goal2", "goal3"],
            "resources": ["resource1", "resource2"],
            "milestone": "What to achieve by end"
          }
        ],
        "finalGoal": "What you'll achieve overall",
        "tips": ["tip1", "tip2", "tip3"]
      }
    `);
    const raw = result.response.text();
    const cleaned = raw.replace(/\`\`\`json|\`\`\`/g, "").trim();
    res.json(JSON.parse(cleaned));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Roadmap generation failed", error: err.message });
  }
});

// ✅ 4. Send Email Report
router.post("/send-email", protect, async (req, res) => {
  try {
    const { analysisId } = req.body;
    const user = await User.findById(req.user.id);
    const analysis = await Analysis.findById(analysisId);
    if (!analysis)
      return res.status(404).json({ message: "Analysis not found" });
    await sendAnalysisEmail(user.email, user.name, analysis);
    res.json({ message: "✅ Email sent successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Email sending failed", error: err.message });
  }
});

// ✅ 5. Version Comparison
router.get("/compare/:id1/:id2", protect, async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    const [v1, v2] = await Promise.all([
      Analysis.findById(id1),
      Analysis.findById(id2),
    ]);
    if (!v1 || !v2)
      return res.status(404).json({ message: "Analysis not found" });
    res.json({
      version1: v1,
      version2: v2,
      scoreDiff: v2.score - v1.score,
      atsDiff: (v2.atsScore || 0) - (v1.atsScore || 0),
      improved: v2.score > v1.score,
    });
  } catch (err) {
    res.status(500).json({ message: "Comparison failed", error: err.message });
  }
});

// Delete single analysis
router.delete("/analysis/:id", protect, async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) return res.status(404).json({ message: "Not found" });
    if (analysis.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized" });
    await Analysis.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Analysis deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// Delete all analyses
router.delete("/analysis-all", protect, async (req, res) => {
  try {
    await Analysis.deleteMany({ userId: req.user.id });
    res.json({ message: "✅ All analyses deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// Delete account
router.delete("/account", protect, async (req, res) => {
  try {
    await Analysis.deleteMany({ userId: req.user.id });
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "✅ Account deleted" });
  } catch (err) {
    res.status(500).json({ message: "Account deletion failed" });
  }
});

export default router;
