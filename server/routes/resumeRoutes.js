import "../config.js";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { protect } from "../middleware/authMiddleware.js";
import Analysis from "../models/Analysis.js";

const router = express.Router();

// ✅ File validation — only PDF, max 5MB
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed!"), false);
    }
    cb(null, true);
  },
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Helper to safely delete uploaded file
const cleanupFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (e) {
    console.error("File cleanup error:", e.message);
  }
};

router.post(
  "/analyze",
  protect,
  (req, res, next) => {
    upload.single("resume")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "File too large! Max size is 5MB." });
        }
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    const filePath = req.file?.path;

    try {
      // ✅ Validate inputs
      if (!req.file) {
        return res.status(400).json({ message: "Please upload a PDF file!" });
      }

      const { jobRole } = req.body;
      if (!jobRole || jobRole.trim().length < 2) {
        cleanupFile(filePath);
        return res
          .status(400)
          .json({ message: "Please enter a valid job role!" });
      }

      if (jobRole.trim().length > 100) {
        cleanupFile(filePath);
        return res.status(400).json({ message: "Job role is too long!" });
      }

      // ✅ Read PDF
      const pdfBuffer = fs.readFileSync(filePath);
      const base64PDF = pdfBuffer.toString("base64");

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
      });

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "application/pdf",
            data: base64PDF,
          },
        },
        {
          text: `You are an expert resume analyzer and career coach.
        Analyze this resume for the role of "${jobRole.trim()}".
        Return ONLY a valid JSON object with no extra text, no markdown, no backticks.
        Use exactly this structure:
        {
          "score": (number 0-100, overall resume quality),
          "atsScore": (number 0-100, how well it passes ATS systems),
          "label": ("Strong" or "Average" or "Weak"),
          "strengths": ["point 1", "point 2", "point 3"],
          "weaknesses": ["point 1", "point 2", "point 3"],
          "missingKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
          "suggestions": ["tip 1", "tip 2", "tip 3"],
          "improvedBullets": [
            "Rewritten version of a weak bullet point from the resume",
            "Rewritten version of another weak bullet point",
            "Rewritten version of another weak bullet point"
          ],
          "interviewQuestions": [
            "Question 1 based on this resume and ${jobRole} role",
            "Question 2 based on this resume and ${jobRole} role",
            "Question 3 based on this resume and ${jobRole} role",
            "Question 4 based on this resume and ${jobRole} role",
            "Question 5 based on this resume and ${jobRole} role"
          ]
        }`,
        },
      ]);

      // ✅ Safe JSON parse
      const raw = result.response.text();
      const cleaned = raw.replace(/```json|```/g, "").trim();

      let analysis;
      try {
        analysis = JSON.parse(cleaned);
      } catch {
        cleanupFile(filePath);
        return res
          .status(500)
          .json({ message: "AI response was invalid. Please try again." });
      }

      // ✅ Validate AI response has required fields
      if (typeof analysis.score !== "number" || !analysis.label) {
        cleanupFile(filePath);
        return res
          .status(500)
          .json({ message: "AI returned incomplete data. Please try again." });
      }

      const saved = await Analysis.create({
        userId: req.user.id,
        fileName: req.file.originalname,
        jobRole: jobRole.trim(),
        ...analysis,
      });

      cleanupFile(filePath);
      res.json(saved);
    } catch (err) {
      cleanupFile(filePath);
      console.error("Analysis error:", err.message);

      // ✅ User-friendly error messages
      if (err.message?.includes("429")) {
        return res.status(429).json({
          message: "AI is busy right now. Please wait a moment and try again.",
        });
      }
      if (err.message?.includes("API key")) {
        return res.status(500).json({
          message: "AI service configuration error. Please contact support.",
        });
      }

      res.status(500).json({ message: "Analysis failed. Please try again." });
    }
  },
);

router.get("/history", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const history = await Analysis.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Analysis.countDocuments({ userId: req.user.id });

    res.json({ history, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

export default router;
