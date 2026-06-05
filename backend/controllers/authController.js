
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

export const register = async (req, res) => {

    // ✅ Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg // show first error
        })
    }

    try {
        // ✅ Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: existingUser.email === req.body.email
                    ? 'Email already registered'
                    : 'Username already taken'
            })
        }

        // ✅ Hash password
        const salt = bcrypt.genSaltSync(12) // increased from 10 to 12
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        })

        await newUser.save()

        res.status(201).json({
            success: true,
            message: 'Account created successfully'
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create account. Please try again.'
        })
    }
}

export const login = async (req, res) => {

    // ✅ Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        })
    }

    try {
        const user = await User.findOne({ email: req.body.email })

        // ✅ Generic message - don't reveal if email exists or not
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // ✅ Create access token (short lived - 15 mins)
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15m' }
        )

        // ✅ Create refresh token (long lived - 7 days)
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '7d' }
        )

        const { password, role, ...rest } = user._doc

        // ✅ Set both tokens in cookies
        res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000 // 15 mins
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })
            .status(200)
            .json({
                success: true,
                token: accessToken,
                data: { ...rest },
                role,
            })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to login. Please try again.'
        })
    }
}

// ✅ Logout - clear both cookies
export const logout = (req, res) => {
    res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .status(200)
        .json({ success: true, message: 'Logged out successfully' })
}