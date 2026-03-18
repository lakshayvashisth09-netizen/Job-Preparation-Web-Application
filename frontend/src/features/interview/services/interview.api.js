import axios from "axios";

const api = axios.create({
baseURL: "https://job-preparation-web-application.onrender.com",
  withCredentials: true,
});

/**
 * 🔥 GENERATE INTERVIEW REPORT
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  try {
    console.log("📦 FILE SENDING:", resumeFile);

    if (!resumeFile) {
      throw new Error("Resume file missing ❌");
    }

    const formData = new FormData();
    formData.append("jobDescription", jobDescription || "");
    formData.append("selfDescription", selfDescription || "");
    formData.append("resume", resumeFile);

    const response = await api.post("/api/interview", formData);
    return response.data;

  } catch (error) {
    console.error("❌ INTERVIEW API ERROR:", error);
    throw error;
  }
};

/**
 * 🔥 GET REPORT BY ID
 */
export const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
  } catch (error) {
    console.error("❌ GET REPORT ERROR:", error);
    throw error;
  }
};

/**
 * 🔥 GET ALL REPORTS
 */
export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/interview");
    return response.data;
  } catch (error) {
    console.error("❌ GET ALL ERROR:", error);
    throw error;
  }
};

/**
 * 🔥 GENERATE RESUME PDF
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  try {
    const response = await api.post(
      `/api/interview/resume/pdf/${interviewReportId}`,
      null,
      {
        responseType: "blob",
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ PDF ERROR:", error);
    throw error;
  }
};