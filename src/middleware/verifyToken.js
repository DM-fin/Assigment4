import jwt from 'jsonwebtoken'
import { getAuthUser } from '../databases/auth.js'

export const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')

    if(!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }

    const token = authHeader.substring(7) // remove 'Bearer ' prefix
 
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
 
        if(!getAuthUser(decodedToken.sub)) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        req.user = decodedToken.sub // corrected from "decodedToken.username" to "decodedToken.sub" to match the payload structure
        next()
    } catch (err) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }
}