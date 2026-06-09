import Razorpay from 'razorpay'
import crypto from 'crypto'
import Booking from '../models/Booking.js'

// Initialize Razorpay
const getRazorpay = () => new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Step 1 - Create Razorpay order

export const createPaymentOrder = async (req, res) => {
    try {
        const razorpay = getRazorpay() // initialize here
        const { amount, tourName, fullName, guestSize, phone, bookAt, userId, userEmail } = req.body

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: { tourName, fullName, userId, userEmail }
        }

        const order = await razorpay.orders.create(options)

        res.status(200).json({
            success: true,
            message: 'Payment order created',
            data: {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                keyId: process.env.RAZORPAY_KEY_ID
            }
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create payment order',
            error: err.message
        })
    }
}

// Step 2 - Verify payment and create booking
export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            tourName,
            fullName,
            guestSize,
            phone,
            bookAt,
            userId,
            userEmail
        } = req.body

        const body = razorpay_order_id + '|' + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex')

        const isAuthentic = expectedSignature === razorpay_signature

        if (!isAuthentic) {
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed - invalid signature'
            })
        }

        const newBooking = new Booking({
            userId,
            userEmail,
            tourName,
            fullName,
            guestSize,
            phone,
            bookAt,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            paymentStatus: 'paid'
        })

        await newBooking.save()

        res.status(200).json({
            success: true,
            message: 'Payment verified and booking confirmed! 🎉',
            data: {
                bookingId: newBooking._id,
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id
            }
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Payment verification failed',
            error: err.message
        })
    }
}

// Get payment details
export const getPaymentDetails = async (req, res) => {
    try {
        const razorpay = getRazorpay() // initialize here
        const payment = await razorpay.payments.fetch(req.params.paymentId)
        res.status(200).json({
            success: true,
            data: payment
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment details'
        })
    }
}