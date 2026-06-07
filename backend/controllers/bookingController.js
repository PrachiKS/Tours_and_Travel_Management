import Booking from '../models/Booking.js'
import Tour from '../models/Tour.js'
import User from '../models/User.js'

// create new booking
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({
            success: true,
            message: 'Your tour is booked',
            data: savedBooking,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

// get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res.status(200).json({
            success: true,
            message: 'Successful',
            data: book
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Not found'
        })
    }
}

// get all bookings
export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find()
        res.status(200).json({
            success: true,
            message: 'Successful',
            data: books,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

// ✅ Delete booking
export const deleteBooking = async (req, res) => {
    const id = req.params.id
    try {
        await Booking.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete booking'
        })
    }
}

// ✅ Admin dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
        const [
            totalBookings,
            totalTours,
            totalUsers,
            recentBookings,
            bookingsByMonth,
            topTours
        ] = await Promise.all([

            // Total counts
            Booking.countDocuments(),
            Tour.countDocuments(),
            User.countDocuments(),

            // Recent 5 bookings
            Booking.find()
                .sort({ createdAt: -1 })
                .limit(5),

            // Bookings per month (last 6 months)
            Booking.aggregate([
                {
                    $group: {
                        _id: {
                            month: { $month: '$createdAt' },
                            year: { $year: '$createdAt' }
                        },
                        count: { $sum: 1 },
                        revenue: { $sum: '$phone' }
                    }
                },
                { $sort: { '_id.year': -1, '_id.month': -1 } },
                { $limit: 6 }
            ]),

            // Top 5 most booked tours
            Booking.aggregate([
                {
                    $group: {
                        _id: '$tourName',
                        bookingCount: { $sum: 1 },
                        totalGuests: { $sum: '$guestSize' }
                    }
                },
                { $sort: { bookingCount: -1 } },
                { $limit: 5 }
            ])
        ])

        res.status(200).json({
            success: true,
            data: {
                totalBookings,
                totalTours,
                totalUsers,
                recentBookings,
                bookingsByMonth,
                topTours
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard stats'
        })
    }
}