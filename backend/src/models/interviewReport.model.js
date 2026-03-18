import mongoose from "mongoose";

// Flexible Schema: Agar AI sirf string bheje toh wo bhi save ho jaye
const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    intention: { type: String, default: "To test technical depth" },
    answer: { type: String, default: "Research more on this topic." }
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    intention: { type: String, default: "To test behavioral traits" },
    answer: { type: String, default: "Provide a STAR method response." }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: true },
    severity: { type: String, enum: ["low", "medium", "high"], default: "medium" }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: { type: Number },
    focus: { type: String },
    tasks: [{ type: String }]
}, { _id: false });

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: { type: String },
    selfDescription: { type: String },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    // Inhe change kiya taaki agar AI galat format de toh error na aaye
    technicalQuestions: [Object], 
    behavioralQuestions: [Object],
    skillGaps: [Object],
    preparationPlan: [Object],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: [true, "Job title is required"]
    }
}, {
    timestamps: true
});

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

export default InterviewReport;