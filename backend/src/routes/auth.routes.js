import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import interviewRouter from "./routes/interview.routes.js";

const app = express();

// 1. CORS Fix: Netlify ka URL bina extra slash ke
app.use(cors({
  origin: "https://classy-maamoul-5ee46a.netlify.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 2. Standard Routes
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRouter);

// 3. JUGAD ROUTES (Frontend ki galti sudhaarne ke liye)
// Agar frontend bina /api/auth ke call kare toh ye handle karega
app.use("/login", authRoutes);
app.use("/register", authRoutes);
app.use("/logout", authRoutes);

// 4. SPECIAL FIX: Frontend POST bhej raha hai get-me ke liye, backend GET mang raha hai
// Ye route dono ko match karwa dega
app.all("/get-me", (req, res, next) => {
    req.url = "/get-me"; // Internal redirect to auth routes
    next();
}, authRoutes);

export default app;