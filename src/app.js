import express from 'express'

import indexRouter from './routes/index.js'
import todoRouter from './routes/routeTodos.js'

const app = express()

// support for json
app.use(express.json())

// define handlers for various routes
app.use('/', indexRouter)
app.use('/todos', todoRouter)

// export the app object to server.js where we referred to this
export default app
