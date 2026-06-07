import express from 'express'
import rateLimit from 'express-rate-limit'
import { body } from 'express-validator'
import { login, register, logout } from '../controllers/authController.js'

const router = express.Router()

// ✅ Strict rate limiter for auth routes only
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // only 10 attempts per 15 mins
    message: { success: false, message: 'Too many attempts, please try again after 15 minutes' }
})

// ✅ Validation rules for register
const registerValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
        .isLength({ max: 20 }).withMessage('Username must not exceed 20 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain uppercase, lowercase and a number'),
]

// ✅ Validation rules for login
const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email'),
    body('password')
        .notEmpty().withMessage('Password is required'),
]

router.post('/register', authLimiter, registerValidation, register)
router.post('/login', authLimiter, loginValidation, login)
router.post('/logout', logout)

export default router