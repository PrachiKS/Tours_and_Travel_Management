import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
    {
        userId: { type: String },
        userEmail: { type: String },
        tourName: { type: String, required: true },
        fullName: { type: String, required: true },
        guestSize: { type: Number, required: true },
        phone: { type: Number, required: true },
        bookAt: { type: Date, required: true },
        // ✅ Payment fields
        paymentId: { type: String },
        orderId: { type: String },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending'
        }
    },
    { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)