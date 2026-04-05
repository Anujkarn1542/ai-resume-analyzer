import jsPDF from "jspdf";

export const exportToPDF = (result) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const boxWidth = 180;
  const maxTextWidth = 170;

  let y = 20;

  const checkPageBreak = (requiredHeight = 20) => {
    if (y + requiredHeight > pageHeight - 15) {
      doc.addPage();
      y = 20;
    }
  };

  const addWrappedText = (text, x, startY, fontSize = 11) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxTextWidth);
    let currentY = startY;

    lines.forEach((line) => {
      doc.text(line, x, currentY);
      currentY += 6;
    });

    return currentY;
  };

  const calculateBoxHeight = (items) => {
    let height = 15;

    items.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, maxTextWidth);
      height += lines.length * 6;
    });

    return height + 5;
  };

  const addBoxSection = (title, items, color) => {
    const boxHeight = calculateBoxHeight(items);

    checkPageBreak(boxHeight);

    const startY = y;

    // box
    doc.setDrawColor(220);
    doc.roundedRect(margin, startY, boxWidth, boxHeight, 2, 2);

    // title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...color);
    doc.text(title, margin + 5, startY + 8);

    let contentY = startY + 16;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);

    items.forEach((item) => {
      contentY = addWrappedText(`• ${item}`, margin + 5, contentY, 11);
    });

    y = startY + boxHeight + 8;
  };

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(99, 102, 241);
  doc.text("ResumeAI Report", margin, y);

  y += 10;

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Role: ${result.jobRole}`, margin, y);
  y += 6;
  doc.text(`File: ${result.fileName}`, margin, y);
  y += 15;

  // score cards
  const cards = [
    ["Score", `${result.score}/100`],
    ["ATS", `${result.atsScore}/100`],
    ["Label", result.label],
  ];

  let x = margin;

  cards.forEach(([label, value]) => {
    doc.roundedRect(x, y, 55, 22, 2, 2);

    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(label, x + 5, y + 7);

    doc.setFontSize(15);
    doc.setTextColor(40);
    doc.text(value, x + 5, y + 16);

    x += 60;
  });

  y += 30;

  addBoxSection("Strengths", result.strengths || [], [34, 197, 94]);
  addBoxSection("Weaknesses", result.weaknesses || [], [239, 68, 68]);

  addBoxSection(
    "Missing Keywords",
    [result.missingKeywords?.join(", ") || "None"],
    [234, 179, 8],
  );

  addBoxSection("Suggestions", result.suggestions || [], [59, 130, 246]);

  addBoxSection(
    "Interview Questions",
    result.interviewQuestions || [],
    [168, 85, 247],
  );

  doc.save(`ResumeAI_${result.jobRole}_Report.pdf`);
};
