import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'You are not authenticated'
        })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            // ✅ Different messages for expired vs invalid
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Session expired, please login again'
                })
            }
            return res.status(403).json({
                success: false,
                message: 'Invalid token'
            })
        }
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next()
        } else {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to perform this action'
            })
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next()
        } else {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            })
        }
    })
}

export default verifyToken