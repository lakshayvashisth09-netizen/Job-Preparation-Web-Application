import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import interviewRouter from "./routes/interview.routes.js";

const app = express();
app.use(cors({
origin: [/netlify\.app$/, "https://classy-maamoul-5ee46a.netlify.app"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// require all routes here
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRouter);

export default app;