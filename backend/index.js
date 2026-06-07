import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'

// ✅ dotenv must be first
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '.env') })

// ✅ app must be created before app.use()
const app = express()
const port = process.env.PORT || 5000

// ✅ Security middleware
app.use(helmet())

// ✅ Global rate limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests, please try again later' }
})
app.use(globalLimiter)

// ✅ CORS
const corsOptions = {
    origin: true,
    credentials: true
}

// ✅ Middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

// ✅ Routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)

// ✅ Database connection
mongoose.set('strictQuery', false)

const connect = () => {
    return mongoose.connect(process.env.MONGO_URI)
}

// ✅ Start server
const startServer = async () => {
    try {
        await connect()
        console.log('MongoDB database connected ✅')
        app.listen(port, () => {
            console.log('server listening on port', port)
        })
    } catch (err) {
        console.error('MongoDB database connection failed', err.message)
        process.exit(1)
    }
}

feature/security-auth
startServer()
// Handle port in use error gracefully
process.on('uncaughtException', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy. Try changing PORT in .env`)
        process.exit(1)
    }
})

startServer();
main
