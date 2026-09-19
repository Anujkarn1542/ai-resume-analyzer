import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { protect } from "../middleware/authMiddleware.js";
import Analysis from "../models/Analysis.js";
import User from "../models/User.js";
import { sendAnalysisEmail } from "../utils/sendEmail.js";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Helper for safe Gemini calls
const callGemini = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

// ✅ JD Matcher
router.post("/jd-match", protect, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return res
        .status(400)
        .json({
          message: "Both resume text and job description are required!",
        });
    }
    if (resumeText.length > 10000) {
      return res
        .status(400)
        .json({ message: "Resume text is too long. Please trim it." });
    }
    if (jobDescription.length > 5000) {
      return res
        .status(400)
        .json({ message: "Job description is too long. Please trim it." });
    }

    const data = await callGemini(`
      Compare this resume with the job description.
      Return ONLY valid JSON, no markdown, no backticks:
      {
        "matchScore": (0-100),
        "matchedKeywords": ["keyword1", "keyword2"],
        "missingKeywords": ["keyword1", "keyword2"],
        "verdict": ("Strong Match" or "Partial Match" or "Weak Match"),
        "tips": ["tip1", "tip2", "tip3"]
      }
      Resume: ${resumeText.trim()}
      Job Description: ${jobDescription.trim()}
    `);

    res.json(data);
  } catch (err) {
    console.error("JD Match error:", err.message);
    if (err.message?.includes("429")) {
      return res
        .status(429)
        .json({ message: "AI is busy. Please try again shortly." });
    }
    res.status(500).json({ message: "Matching failed. Please try again." });
  }
});

// ✅ Cover Letter
router.post("/cover-letter", protect, async (req, res) => {
  try {
    const { resumeText, jobDescription, companyName } = req.body;

    if (
      !resumeText?.trim() ||
      !jobDescription?.trim() ||
      !companyName?.trim()
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (companyName.trim().length > 100) {
      return res.status(400).json({ message: "Company name is too long!" });
    }

    const data = await callGemini(`
      Write a professional cover letter for this candidate.
      Company: ${companyName.trim()}
      Job Description: ${jobDescription.trim()}
      Resume: ${resumeText.trim()}
      Return ONLY valid JSON, no markdown, no backticks:
      {
        "coverLetter": "Full cover letter text here..."
      }
    `);

    res.json(data);
  } catch (err) {
    console.error("Cover letter error:", err.message);
    if (err.message?.includes("429")) {
      return res
        .status(429)
        .json({ message: "AI is busy. Please try again shortly." });
    }
    res
      .status(500)
      .json({ message: "Cover letter generation failed. Please try again." });
  }
});

// ✅ Career Roadmap
router.post("/roadmap", protect, async (req, res) => {
  try {
    const { currentSkills, targetRole, timeframe } = req.body;

    if (!currentSkills?.trim() || !targetRole?.trim()) {
      return res
        .status(400)
        .json({ message: "Current skills and target role are required!" });
    }

    const validTimeframes = ["1", "2", "3", "6", "12"];
    if (!validTimeframes.includes(String(timeframe))) {
      return res.status(400).json({ message: "Invalid timeframe selected!" });
    }

    const data = await callGemini(`
      Create a personalized career roadmap.
      Target Role: ${targetRole.trim()}
      Current Skills: ${currentSkills.trim()}
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

    res.json(data);
  } catch (err) {
    console.error("Roadmap error:", err.message);
    if (err.message?.includes("429")) {
      return res
        .status(429)
        .json({ message: "AI is busy. Please try again shortly." });
    }
    res
      .status(500)
      .json({ message: "Roadmap generation failed. Please try again." });
  }
});

// ✅ Send Email
router.post("/send-email", protect, async (req, res) => {
  try {
    const { analysisId } = req.body;

    if (!analysisId) {
      return res.status(400).json({ message: "Analysis ID is required!" });
    }

    const [user, analysis] = await Promise.all([
      User.findById(req.user.id),
      Analysis.findById(analysisId),
    ]);

    if (!user) return res.status(404).json({ message: "User not found!" });
    if (!analysis)
      return res.status(404).json({ message: "Analysis not found!" });

    // ✅ Only owner can email their own analysis
    if (analysis.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    await sendAnalysisEmail(user.email, user.name, analysis);
    res.json({ message: "✅ Report sent to your email!" });
  } catch (err) {
    console.error("Email error:", err.message);
    res
      .status(500)
      .json({ message: "Failed to send email. Please try again." });
  }
});

// ✅ Version Comparison
router.get("/compare/:id1/:id2", protect, async (req, res) => {
  try {
    const { id1, id2 } = req.params;

    if (id1 === id2) {
      return res
        .status(400)
        .json({ message: "Please select two different analyses!" });
    }

    const [v1, v2] = await Promise.all([
      Analysis.findById(id1),
      Analysis.findById(id2),
    ]);

    if (!v1 || !v2)
      return res
        .status(404)
        .json({ message: "One or both analyses not found!" });

    // ✅ Security — only owner can compare their analyses
    if (
      v1.userId.toString() !== req.user.id ||
      v2.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    res.json({
      version1: v1,
      version2: v2,
      scoreDiff: v2.score - v1.score,
      atsDiff: (v2.atsScore || 0) - (v1.atsScore || 0),
      improved: v2.score > v1.score,
    });
  } catch (err) {
    res.status(500).json({ message: "Comparison failed. Please try again." });
  }
});

// ✅ Delete single analysis
router.delete("/analysis/:id", protect, async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis)
      return res.status(404).json({ message: "Analysis not found!" });
    if (analysis.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized!" });
    }
    await Analysis.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Analysis deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed. Please try again." });
  }
});

// ✅ Delete all analyses
router.delete("/analysis-all", protect, async (req, res) => {
  try {
    const count = await Analysis.countDocuments({ userId: req.user.id });
    if (count === 0) {
      return res.status(404).json({ message: "No analyses to delete!" });
    }
    await Analysis.deleteMany({ userId: req.user.id });
    res.json({ message: `✅ ${count} analyses deleted` });
  } catch (err) {
    res.status(500).json({ message: "Delete failed. Please try again." });
  }
});

// ✅ Delete account
router.delete("/account", protect, async (req, res) => {
  try {
    await Promise.all([
      Analysis.deleteMany({ userId: req.user.id }),
      User.findByIdAndDelete(req.user.id),
    ]);
    res.json({ message: "✅ Account deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Account deletion failed. Please try again." });
  }
});

export default router;
