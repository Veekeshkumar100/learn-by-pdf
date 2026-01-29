import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
} from "../controller/authController.js";
import { projectAuth } from "../Middleware/auth.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Register route
const registerValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const LoginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
router.post("/register", registerValidation, registerUser);
router.post("/login", LoginValidation, loginUser);

router.get("/profile", projectAuth, getProfile);
router.post("/profile", projectAuth, updateProfile);
router.post("/change-password", projectAuth, changePassword);

export default router;
// Login route
