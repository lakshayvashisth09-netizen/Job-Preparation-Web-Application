import Groq from "groq-sdk";
import puppeteer from "puppeteer";

console.log("GROQ KEY:", process.env.GROQ_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert interviewer. 
Return ONLY valid JSON (no markdown).

{
  "title": "Job Title",
  "matchScore": 85,
  "technicalQuestions": [
    { "question": "string", "answer": "string", "intention": "string" }
  ],
  "behavioralQuestions": [
    { "question": "string", "answer": "string", "intention": "string" }
  ],
  "skillGaps": [
    { "skill": "string", "severity": "low/medium/high" }
  ],
  "preparationPlan": [
    { "day": 1, "focus": "string", "tasks": ["task1", "task2"] }
  ]
}

Resume: ${resume?.slice(0, 1000)}
Self: ${selfDescription?.slice(0, 300)}
JD: ${jobDescription?.slice(0, 800)}
`;

  const res = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    response_format: { type: "json_object" } // 🔥 Groq ko force karo JSON ke liye
  });

  

  let text = res.choices[0].message.content;

  console.log("RAW AI:", text);

  let parsed = {};

  try {
    const clean = text.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(clean);
  } catch (e) {
    console.log("PARSE ERROR");
  }

  return {
    title: parsed.title || "Software Developer",
    matchScore: parsed.matchScore || 60,
    technicalQuestions: parsed.technicalQuestions || [],
    behavioralQuestions: parsed.behavioralQuestions || [],
    skillGaps: parsed.skillGaps || [],
    preparationPlan: parsed.preparationPlan || [],
  };
}

// ================= PDF GENERATION =================
async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
}

// ================= RESUME PDF =================
async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate a professional resume in HTML format based on the following details.
Return ONLY a JSON object: { "html": "..." }

User: Lakshay Vashisth
Tech: MERN Stack (React, Node, Mongo, Express)

Resume Content: ${resume?.slice(0, 1000)}
Goal Job: ${jobDescription?.slice(0, 500)}

Make it look like a modern single-page resume with CSS inside <style> tags.
`;
// ... baaki logic same
  let html = "";

  try {
    const res = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile", // 🔥 FIXED
      temperature: 0.2,
    });

    let text = res.choices[0].message.content;

    console.log("RAW PDF:", text);

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    html = parsed.html;
  } catch (err) {
    console.log("AI FAILED → fallback");

    // 🔥 HARD FALLBACK (ALWAYS WORKS)
    html = `
    <html>
      <body style="font-family: Arial; padding: 20px;">
        <h1>Lakshay Vashisth</h1>
        <p>BCA Student | MERN Stack Developer</p>
        <h3>Skills</h3>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
        </ul>
      </body>
    </html>
    `;
  }

  const pdfBuffer = await generatePdfFromHtml(html);
  return pdfBuffer;
}

export { generateInterviewReport, generateResumePdf };