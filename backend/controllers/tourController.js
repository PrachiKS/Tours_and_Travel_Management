
import Tour from '../models/Tour.js'

// create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body)
    try {
        const savedTour = await newTour.save()
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savedTour,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again'
        })
    }
}

// update tour
export const updateTour = async (req, res) => {
    const id = req.params.id
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id, { $set: req.body }, { new: true }
        )
        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedTour,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update'
        })
    }
}

// delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id
    try {
        await Tour.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'Successfully deleted'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete'
        })
    }
}

// get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id
    try {
        const tour = await Tour.findById(id).populate('reviews')
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Successful',
            data: tour
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Not found'
        })
    }
}

// get all tours with pagination
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page) || 0
    try {
        const tours = await Tour.find({})
            .populate('reviews')
            .skip(page * 8)
            .limit(8)

        res.status(200).json({
            success: true,
            count: tours.length,
            message: 'Successful',
            data: tours,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Not found'
        })
    }
}

// ✅ Advanced search with filters
export const getTourBySearch = async (req, res) => {
    const {
        city,
        distance,
        maxGroupSize,
        minPrice,
        maxPrice,
        featured,
        sortBy,
        page = 0,
        limit = 8
    } = req.query

    try {
        // ✅ Build dynamic query
        const query = {}

        // City search - case insensitive
        if (city) {
            query.city = new RegExp(city, 'i')
        }

        // Distance filter
        if (distance) {
            query.distance = { $gte: parseInt(distance) }
        }

        // Group size filter
        if (maxGroupSize) {
            query.maxGroupSize = { $gte: parseInt(maxGroupSize) }
        }

        // ✅ Price range filter
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = parseInt(minPrice)
            if (maxPrice) query.price.$lte = parseInt(maxPrice)
        }

        // ✅ Featured filter
        if (featured !== undefined && featured !== '') {
            query.featured = featured === 'true'
        }

        // ✅ Sort options
        let sortOption = {}
        switch (sortBy) {
            case 'price_low':
                sortOption = { price: 1 }
                break
            case 'price_high':
                sortOption = { price: -1 }
                break
            case 'distance':
                sortOption = { distance: 1 }
                break
            case 'newest':
                sortOption = { createdAt: -1 }
                break
            default:
                sortOption = { createdAt: -1 }
        }

        const pageNum = parseInt(page)
        const limitNum = parseInt(limit)
        const skip = pageNum * limitNum

        // ✅ Run query with pagination
        const [tours, total] = await Promise.all([
            Tour.find(query)
                .populate('reviews')
                .sort(sortOption)
                .skip(skip)
                .limit(limitNum),
            Tour.countDocuments(query)
        ])

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: tours,
            pagination: {
                total,
                page: pageNum,
                pages: Math.ceil(total / limitNum),
                limit: limitNum
            }
        })

    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Search failed'
        })
    }
}

// get featured tours
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true })
            .populate('reviews')
            .limit(8)

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: tours,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Not found'
        })
    }
}

// get tour count
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()
        res.status(200).json({
            success: true,
            data: tourCount
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch'
        })
    }
}

// ✅ NEW - Get price range (min and max price in DB)
export const getPriceRange = async (req, res) => {
    try {
        const result = await Tour.aggregate([
            {
                $group: {
                    _id: null,
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            }
        ])
        res.status(200).json({
            success: true,
            data: result[0]
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch price range'
        })
    }
}

// ✅ NEW - Get all unique cities
export const getAllCities = async (req, res) => {
    try {
        const cities = await Tour.distinct('city')
        res.status(200).json({
            success: true,
            data: cities
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cities'
        })
    }
}