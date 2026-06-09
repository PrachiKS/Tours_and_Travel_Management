import express from 'express'
import {
    createPaymentOrder,
    verifyPayment,
    getPaymentDetails
} from '../controllers/paymentController.js'
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

//Create payment order
router.post('/create-order', verifyUser, createPaymentOrder)

//Verify payment and confirm booking
router.post('/verify', verifyUser, verifyPayment)

//Get payment details - admin only
router.get('/:paymentId', verifyAdmin, getPaymentDetails)

export default router