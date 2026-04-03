import "../config.js";
import express from "express";
import multer from "multer";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { protect } from "../middleware/authMiddleware.js";
import Analysis from "../models/Analysis.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze", protect, upload.single("resume"), async (req, res) => {
  try {
    const { jobRole } = req.body;

    const pdfBuffer = fs.readFileSync(req.file.path);
    const base64PDF = pdfBuffer.toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64PDF,
        },
      },
      {
        text: `You are an expert resume analyzer and career coach.
        Analyze this resume for the role of "${jobRole}".
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

    const raw = result.response.text();
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(cleaned);

    const saved = await Analysis.create({
      userId: req.user.id,
      fileName: req.file.originalname,
      jobRole,
      ...analysis,
    });

    fs.unlinkSync(req.file.path);
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Analysis failed", error: err.message });
  }
});

router.get("/history", protect, async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
