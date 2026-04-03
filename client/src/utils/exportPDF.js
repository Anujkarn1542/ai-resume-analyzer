import jsPDF from "jspdf";

export const exportToPDF = (result) => {
  const doc = new jsPDF();
  let y = 20;

  const addLine = (text, size = 12, color = [255, 255, 255], bold = false) => {
    doc.setFontSize(size);
    doc.setTextColor(...color);
    if (bold) doc.setFont("helvetica", "bold");
    else doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, 170);
    lines.forEach((line) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 20, y);
      y += size * 0.5 + 2;
    });
    y += 3;
  };

  // Background
  doc.setFillColor(10, 10, 20);
  doc.rect(0, 0, 210, 297, "F");

  // Title
  addLine("🧠 ResumeAI — Analysis Report", 20, [168, 85, 247], true);
  addLine(`Job Role: ${result.jobRole}`, 12, [156, 163, 175]);
  addLine(`File: ${result.fileName}`, 12, [156, 163, 175]);
  y += 5;

  // Score
  addLine(
    `Overall Score: ${result.score}/100  |  ATS Score: ${result.atsScore}/100`,
    14,
    [168, 85, 247],
    true,
  );
  addLine(`Label: ${result.label}`, 12, [156, 163, 175]);
  y += 5;

  // Strengths
  addLine("✅ Strengths", 14, [34, 197, 94], true);
  result.strengths?.forEach((s) => addLine(`• ${s}`, 11, [200, 200, 200]));
  y += 3;

  // Weaknesses
  addLine("⚠️ Weaknesses", 14, [239, 68, 68], true);
  result.weaknesses?.forEach((w) => addLine(`• ${w}`, 11, [200, 200, 200]));
  y += 3;

  // Missing Keywords
  addLine("🔑 Missing Keywords", 14, [234, 179, 8], true);
  addLine(result.missingKeywords?.join(", "), 11, [200, 200, 200]);
  y += 3;

  // Suggestions
  addLine("💡 Suggestions", 14, [59, 130, 246], true);
  result.suggestions?.forEach((s) => addLine(`• ${s}`, 11, [200, 200, 200]));
  y += 3;

  // Interview Questions
  addLine("🎯 Interview Questions", 14, [168, 85, 247], true);
  result.interviewQuestions?.forEach((q, i) =>
    addLine(`Q${i + 1}: ${q}`, 11, [200, 200, 200]),
  );

  doc.save(`ResumeAI_${result.jobRole}_Report.pdf`);
};
