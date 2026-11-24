import express from 'express'
import cookieParser from 'cookie-parser'
import {verifyToken} from './middleware/verifytoken.js'
import indexRouter from './routes/index.js'
import todoRouter from './routes/routeTodos.js'
import authRouter from './routes/auth.js'
import { loginLimiter, apiLimiter } from './middleware/rate-limiters.js'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerDocument = YAML.load('./openapi/api.yaml')
const swaggerOptions = {}

const app = express()

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))

// support for json
app.use(express.json())
app.use(cookieParser())

// define handlers for various routes
app.use('/', indexRouter)
app.use('/auth', loginLimiter, authRouter)
app.use('/todos', verifyToken, apiLimiter, todoRouter)

// export the app object to server.js where we referred to this
export default app
