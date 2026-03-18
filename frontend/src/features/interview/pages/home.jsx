import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState("");

  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0];
    if (!jobDescription) {
      alert("Please provide a Job Description!");
      return;
    }

    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      if (data && data._id) {
        navigate(`/interview/${data._id}`);
      }
    } catch (error) {
      console.error("Frontend Error:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0d1117] text-[#e6edf3]">
        <h1 className="text-2xl font-semibold animate-pulse">Generating your plan...</h1>
      </main>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center py-12 px-6 gap-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">
          Create Your Custom <span className="text-[#ff2d78]">Interview Plan</span>
        </h1>
      </header>

      {/* INPUT CARD */}
      <div className="w-full max-w-[900px] bg-[#161b22] border border-[#2a3348] rounded-xl overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          <div className="flex-1 p-6 flex flex-col gap-4 border-r border-[#2a3348]">
            <h2 className="text-sm font-semibold">Target Job Description</h2>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste JD here..."
              className="flex-1 bg-[#1e2535] border border-[#2a3348] rounded-lg p-4 text-sm outline-none focus:border-[#ff2d78] resize-none"
            />
          </div>

          <div className="flex-1 p-6 flex flex-col gap-4">
            <h2 className="text-sm font-semibold">Your Profile</h2>
            <label htmlFor="resumeUpload" className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${fileName ? "border-[#ff2d78] bg-[#ff2d7808]" : "border-[#2a3348] hover:border-[#ff2d78]"}`}>
              <p className="text-sm font-medium">{fileName ? `✅ ${fileName}` : "Upload Resume"}</p>
              <input id="resumeUpload" type="file" ref={resumeInputRef} className="hidden" onChange={(e) => setFileName(e.target.files[0]?.name)} />
            </label>
            <textarea
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              placeholder="Self description..."
              className="h-32 bg-[#1e2535] border border-[#2a3348] rounded-lg p-3 text-sm outline-none focus:border-[#ff2d78] resize-none"
            />
          </div>
        </div>
        <div className="p-4 border-t border-[#2a3348] flex justify-between items-center bg-[#1c2128]">
          <button onClick={handleGenerateReport} className="ml-auto px-6 py-2 bg-[#ff2d78] hover:bg-[#d81b60] text-white rounded-lg font-bold transition">
            Generate Strategy
          </button>
        </div>
      </div>

      {/* HISTORY SECTION (FIXED) */}
      {reports && reports.length > 0 && (
        <div className="w-full max-w-[900px]">
          <h3 className="text-lg font-semibold mb-4 text-[#ff2d78]">Recent History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((r) => (
              <div key={r._id} onClick={() => navigate(`/interview/${r._id}`)} className="p-4 bg-[#161b22] border border-[#2a3348] rounded-lg cursor-pointer hover:border-[#ff2d78] transition group">
                <p className="text-sm font-medium truncate group-hover:text-[#ff2d78]">
                  {/* 👈 FIXED: substring error solution */}
                  {r?.jobDescription ? r.jobDescription.substring(0, 60) : "Job Report"}...
                </p>
                <div className="flex justify-between mt-2">
                   <span className="text-[10px] text-[#7d8590]">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Recently"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;