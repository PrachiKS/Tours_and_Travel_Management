import express from 'express'
import {
    createBooking,
    getBooking,
    getAllBooking,
    deleteBooking,
    getDashboardStats
} from '../controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// ✅ Dashboard stats - must be before /:id route
router.get('/admin/dashboard', verifyAdmin, getDashboardStats)

// Create booking
router.post('/', verifyUser, createBooking)

// Get single booking
router.get('/:id', verifyUser, getBooking)

// Get all bookings - admin only
router.get('/', verifyAdmin, getAllBooking)

// ✅ Delete booking - admin only
router.delete('/:id', verifyAdmin, deleteBooking)

export default router