import express from 'express'
import {
    createTour,
    updateTour,
    deleteTour,
    getSingleTour,
    getAllTour,
    getTourBySearch,
    getFeaturedTour,
    getTourCount,
    getPriceRange,
    getAllCities
} from '../controllers/tourController.js'

import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

//Specific routes MUST come before /:id route

router.get('/search/getTourBySearch', getTourBySearch)
router.get('/search/getFeaturedTours', getFeaturedTour)
router.get('/search/getTourCount', getTourCount)
router.get('/search/getPriceRange', getPriceRange)      // ✅ new
router.get('/search/getAllCities', getAllCities)          // ✅ new

// CRUD routes
router.post('/', verifyAdmin, createTour)
router.put('/:id', verifyAdmin, updateTour)
router.delete('/:id', verifyAdmin, deleteTour)
router.get('/:id', getSingleTour)
router.get('/', getAllTour)

export default router