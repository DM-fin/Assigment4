import { rateLimit } from 'express-rate-limit'

// default ip-based limiting (for auth)

export const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3, // limit each IP to 3 requests per windowMs
    standardHeaders: 'draft-6', // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    message: {
        error: 'Too many requests, please try again later'
    }
});


// default req.user-based limiting (for api)
export const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3, 
    standardHeaders: 'draft-6', // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    keyGenerator: (req) => req.user, // use req.user as the key for rate limiting

    message: {
        error: 'Too many requests, please try again later'
    }
});

