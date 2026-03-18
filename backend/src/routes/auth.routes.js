import { Router } from "express";
import { registerUserController, loginUserController, logoutUserController, getMeController } from "../controllers/auth.controllers.js";
import { Blacklist } from "../models/blacklist.model.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post("/register", registerUserController);
/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
router.post("/login", loginUserController);

/**
 * @route POST /api/auth/logout
 * @description Logout a user
 * @access Public
 */
router.get("/logout", logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get current user's information
 * @access Private
 */
router.get("/get-me", authMiddleware, getMeController);

export default router;
 