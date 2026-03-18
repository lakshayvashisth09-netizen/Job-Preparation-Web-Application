import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
 generateInterviewReportController,
 getInterviewReportByIdController,
 getAllInterviewReportsController,
 generateResumePdfController
} from "../controllers/interview.controller.js";
import { upload } from "../middlewares/file.middleware.js";

const interviewRouter = express.Router();
/**
 * @route POST /api/interview
 * @description Generate interview report and preparation plan for the candidate based on their resume, self description and job description
 * @access private
 */

interviewRouter.post("/", authMiddleware, upload.single("resume"), generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware, getInterviewReportByIdController)
/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authMiddleware, getAllInterviewReportsController)
/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware, generateResumePdfController)

export default interviewRouter;