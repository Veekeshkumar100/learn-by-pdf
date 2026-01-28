import express from 'express';
import { registerUser, loginUser } from '../controller/authController.js';
const router = express.Router();

const { body } = require('express-validator');
import { validationResult } from 'express-validator';
import protect from '../Middleware/authMiddleware.js';
// Register route

const registerValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    body("username").trim().notEmpty().withMessage("Username is required");
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required");
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long");
}
const LoginValidation = (req, res, next) => {
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required");
    body("password").notEmpty().withMessage("Password is required");
}
router.post('/register',registerValidation, registerUser);
router.post('/login',LoginValidation, loginUser);

router.get("/profile",protect, getProfile)
router.put("/profile",protect, updateProfile);
router.post("/change-password",protect, changePassword)

export default router;
// Login route
