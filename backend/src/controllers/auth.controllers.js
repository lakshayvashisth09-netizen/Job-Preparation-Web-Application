import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Blacklist } from "../models/blacklist.model.js";

/**
 * @name registerUserController
 * @description register a new user
 * @access Public
 */
async function registerUserController(req, res) {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExists = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (isUserExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hash
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * @name loginUserController
 * @description login a user
 * @access Public
 */
async function loginUserController(req, res) {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
/**
 * @name logoutUserController
 * @description logout a user
 * @access Public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await Blacklist.create({ token });
  }

  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out successfully"
  });
}

/**
 * @name getMeController
 * @description Get current user's information
 * @access Private
 */
async function getMeController(req, res) {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    message: "User information retrieved successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
}

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController
};