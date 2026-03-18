import React, { useState, useEffect } from "react"
import { useInterview } from "../hooks/useInterview.js"
import { useParams } from "react-router"

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
]

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  
  // Agar item null hai toh crash nahi hoga
  if (!item) return null;

  return (
    <div className="bg-[#1c2230] border border-[#2a3348] rounded-lg overflow-hidden hover:border-[#3a4663] transition-all">
      <div
        onClick={() => setOpen(o => !o)}
        className="flex items-start gap-3 p-4 cursor-pointer"
      >
        <span className="text-xs font-bold text-pink-500 bg-pink-500/10 border border-pink-500/20 px-2 py-[2px] rounded">
          Q{index + 1}
        </span>

        <p className="flex-1 text-sm text-white">{item?.question || "Question not generated"}</p>

        <span
          className={`transition-transform ${
            open ? "rotate-180 text-pink-500" : "text-gray-400"
          }`}
        >
          ▼
        </span>
      </div>

      {open && (
        <div className="border-t border-[#2a3348] p-4 flex flex-col gap-4 bg-[#161b22]/50">
          <div>
            <span className="text-[11px] uppercase font-bold text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-[2px] rounded">
              Intention
            </span>
            <p className="text-sm text-gray-400 mt-2">{item?.intention || "Analyze carefully."}</p>
          </div>

          <div>
            <span className="text-[11px] uppercase font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-[2px] rounded">
              Model Answer
            </span>
            <p className="text-sm text-gray-400 mt-2">{item?.answer || "Prepare a concise answer."}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const RoadMapDay = ({ day }) => {
  if (!day) return null;
  return (
    <div className="relative pl-10 pb-6">
      <div className="absolute left-[20px] top-2 w-[12px] h-[12px] rounded-full border-2 border-pink-500 bg-[#161b22]" />

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-pink-500 bg-pink-500/10 border border-pink-500/20 px-2 py-[2px] rounded-full">
          Day {day?.day || "-"}
        </span>

        <h3 className="text-sm font-semibold text-white">{day?.focus || "Study Session"}</h3>
      </div>

      <ul className="flex flex-col gap-2">
        {/* Safe mapping for tasks to prevent 'undefined' error */}
        {day?.tasks?.map((task, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="w-[5px] h-[5px] mt-2 rounded-full bg-gray-400" />
            {task}
          </li>
        )) || <li className="text-xs italic text-gray-500">No specific tasks listed</li>}
      </ul>
    </div>
  )
}

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical")
  const { report, getReportById, loading, getResumePdf } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  if (loading || !report) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0d1117] text-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="animate-pulse font-medium">Loading your custom plan...</p>
        </div>
      </main>
    )
  }

  const score = report?.matchScore || 0;
  const scoreColor =
    score >= 80 ? "border-green-500 text-green-500" : 
    score >= 60 ? "border-yellow-500 text-yellow-500" : "border-red-500 text-red-500"

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-white flex p-6">
      <div className="flex w-full max-w-[1280px] mx-auto bg-[#161b22] border border-[#2a3348] rounded-xl overflow-hidden shadow-2xl">

        {/* LEFT NAV */}
        <nav className="w-[240px] flex flex-col justify-between p-6 border-r border-[#2a3348] bg-[#0d1117]/50">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-6">
              Navigation
            </p>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm mb-2 transition-all font-medium ${
                  activeNav === item.id
                    ? "bg-pink-500/10 text-pink-500 border border-pink-500/20 shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-[#1c2230]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => getResumePdf(interviewId)}
            className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold py-3 rounded-lg shadow-lg active:scale-95 transition"
          >
            DOWNLOAD RESUME
          </button>
        </nav>

        {/* CENTER CONTENT - SCROLLBAR HIDE APPLIED HERE */}
        <main 
  className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-3rem)] scrollbar-hide"
  style={{ 
    msOverflowStyle: 'none', 
    scrollbarWidth: 'none',
    WebkitScrollbar: { display: 'none' } 
  }}
>
          {activeNav === "technical" && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 border-b border-[#2a3348] pb-6 mb-8">
                <h2 className="text-xl font-bold">Technical Questions</h2>
                <span className="text-xs bg-pink-500 text-white font-bold px-3 py-1 rounded-full">
                  {report?.technicalQuestions?.length || 0}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {report?.technicalQuestions?.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                )) || <p className="text-gray-500 italic">No questions found.</p>}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 border-b border-[#2a3348] pb-6 mb-8">
                <h2 className="text-xl font-bold">Behavioral Questions</h2>
              </div>
              <div className="flex flex-col gap-4">
                {report?.behavioralQuestions?.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                )) || <p className="text-gray-500 italic">No behavioral questions found.</p>}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 border-b border-[#2a3348] pb-6 mb-8">
                <h2 className="text-xl font-bold">Preparation Road Map</h2>
              </div>
              <div className="relative pl-6 border-l-2 border-[#2a3348]">
                {report?.preparationPlan?.map((day, idx) => (
                  <RoadMapDay key={idx} day={day} />
                )) || <p className="text-gray-500 italic">Preparation plan is being processed.</p>}
              </div>
            </section>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-[280px] p-8 border-l border-[#2a3348] flex flex-col gap-8 bg-[#0d1117]/30">
          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold self-start">
              Match Analysis
            </p>
            <div className={`w-[110px] h-[110px] rounded-full border-[6px] flex items-center justify-center transition-all ${scoreColor} shadow-xl`}>
              <span className="text-3xl font-black">{score}%</span>
            </div>
            <p className={`text-xs font-bold ${score >= 60 ? "text-green-400" : "text-red-400"}`}>
               {score >= 60 ? "✓ STRONG CANDIDATE" : "⚠ IMPROVEMENT NEEDED"}
            </p>
          </div>

          <div className="border-t border-[#2a3348]" />

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">
              Detected Skill Gaps
            </p>
            <div className="flex flex-wrap gap-2">
              {report?.skillGaps?.map((gap, i) => (
                <span
                  key={i}
                  className={`text-[10px] px-3 py-1.5 rounded-md border font-bold uppercase ${
                    gap?.severity === "high"
                      ? "text-red-400 border-red-400/30 bg-red-400/10"
                      : "text-green-400 border-green-400/30 bg-green-400/10"
                  }`}
                >
                  {gap?.skill || "Skill Gap"}
                </span>
              )) || <p className="text-xs text-gray-600">No major gaps detected.</p>}
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}

export default Interview