import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendAnalysisEmail = async (toEmail, name, analysis) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #fff; padding: 30px; border-radius: 16px;">
      <h1 style="color: #a855f7; text-align: center;">🧠 ResumeAI Report</h1>
      <p style="color: #9ca3af;">Hi ${name}, here's your resume analysis report!</p>
      
      <div style="background: #111827; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h2 style="color: #fff;">📊 Scores</h2>
        <p>Overall Score: <strong style="color: #a855f7;">${analysis.score}/100</strong></p>
        <p>ATS Score: <strong style="color: #22c55e;">${analysis.atsScore}/100</strong></p>
        <p>Label: <strong style="color: #a855f7;">${analysis.label}</strong></p>
        <p>Job Role: <strong style="color: #fff;">${analysis.jobRole}</strong></p>
      </div>

      <div style="background: #111827; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h2 style="color: #22c55e;">✅ Strengths</h2>
        ${analysis.strengths?.map((s) => `<p style="color: #9ca3af;">• ${s}</p>`).join("")}
      </div>

      <div style="background: #111827; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h2 style="color: #ef4444;">⚠️ Weaknesses</h2>
        ${analysis.weaknesses?.map((w) => `<p style="color: #9ca3af;">• ${w}</p>`).join("")}
      </div>

      <div style="background: #111827; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h2 style="color: #eab308;">🔑 Missing Keywords</h2>
        <p style="color: #9ca3af;">${analysis.missingKeywords?.join(", ")}</p>
      </div>

      <div style="background: #111827; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h2 style="color: #3b82f6;">💡 Suggestions</h2>
        ${analysis.suggestions?.map((s) => `<p style="color: #9ca3af;">• ${s}</p>`).join("")}
      </div>

      <p style="color: #6b7280; text-align: center; margin-top: 30px; font-size: 12px;">
        Powered by ResumeAI — Built with MERN + Gemini AI
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"ResumeAI 🧠" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Your Resume Analysis Report — ${analysis.jobRole}`,
    html,
  });
};
