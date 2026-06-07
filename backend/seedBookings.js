import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '.env') })

const bookingSchema = new mongoose.Schema(
    {
        userId: { type: String },
        userEmail: { type: String },
        tourName: { type: String, required: true },
        fullName: { type: String, required: true },
        guestSize: { type: Number, required: true },
        phone: { type: Number, required: true },
        bookAt: { type: Date, required: true },
    },
    { timestamps: true }
)

const Booking = mongoose.model('Booking', bookingSchema)

const bookings = [
    { userId: 'user1', userEmail: 'rahul@gmail.com', tourName: 'Goa Beach Paradise', fullName: 'Rahul Sharma', guestSize: 2, phone: 9876543210, bookAt: new Date('2026-01-15') },
    { userId: 'user2', userEmail: 'priya@gmail.com', tourName: 'Kerala Backwaters Cruise', fullName: 'Priya Patel', guestSize: 4, phone: 9876543211, bookAt: new Date('2026-01-20') },
    { userId: 'user3', userEmail: 'amit@gmail.com', tourName: 'Manali Snow Adventure', fullName: 'Amit Verma', guestSize: 3, phone: 9876543212, bookAt: new Date('2026-02-05') },
    { userId: 'user4', userEmail: 'sneha@gmail.com', tourName: 'Rajasthan Royal Heritage Tour', fullName: 'Sneha Joshi', guestSize: 5, phone: 9876543213, bookAt: new Date('2026-02-14') },
    { userId: 'user1', userEmail: 'rahul@gmail.com', tourName: 'Agra Taj Mahal Sunrise Tour', fullName: 'Rahul Sharma', guestSize: 2, phone: 9876543210, bookAt: new Date('2026-02-20') },
    { userId: 'user2', userEmail: 'priya@gmail.com', tourName: 'Goa Beach Paradise', fullName: 'Priya Patel', guestSize: 3, phone: 9876543211, bookAt: new Date('2026-03-01') },
    { userId: 'user3', userEmail: 'amit@gmail.com', tourName: 'Andaman Island Explorer', fullName: 'Amit Verma', guestSize: 2, phone: 9876543212, bookAt: new Date('2026-03-10') },
    { userId: 'user4', userEmail: 'sneha@gmail.com', tourName: 'Goa Beach Paradise', fullName: 'Sneha Joshi', guestSize: 4, phone: 9876543213, bookAt: new Date('2026-03-15') },
    { userId: 'user1', userEmail: 'rahul@gmail.com', tourName: 'Leh Ladakh Bike Expedition', fullName: 'Rahul Sharma', guestSize: 1, phone: 9876543210, bookAt: new Date('2026-04-01') },
    { userId: 'user2', userEmail: 'priya@gmail.com', tourName: 'Kerala Backwaters Cruise', fullName: 'Priya Patel', guestSize: 2, phone: 9876543211, bookAt: new Date('2026-04-10') },
    { userId: 'user3', userEmail: 'amit@gmail.com', tourName: 'Darjeeling Tea Garden Tour', fullName: 'Amit Verma', guestSize: 3, phone: 9876543212, bookAt: new Date('2026-04-20') },
    { userId: 'user4', userEmail: 'sneha@gmail.com', tourName: 'Manali Snow Adventure', fullName: 'Sneha Joshi', guestSize: 2, phone: 9876543213, bookAt: new Date('2026-05-05') },
]

const seedBookings = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected ✅')

        await Booking.deleteMany({})
        console.log('Existing bookings cleared 🗑️')

        await Booking.insertMany(bookings)
        console.log('12 Sample bookings inserted successfully 🎉')

        mongoose.connection.close()
        console.log('Database connection closed ✅')
    } catch (err) {
        console.error('Error seeding bookings:', err.message)
        process.exit(1)
    }
}

seedBookings()