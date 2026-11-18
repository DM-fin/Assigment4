import express from 'express'

import indexRouter from './routes/index.js'
import todoRouter from './routes/routeTodos.js'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerDocument = YAML.load('./openapi/api.yaml')
const swaggerOptions = {}

const app = express()

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))

// support for json
app.use(express.json())

// define handlers for various routes
app.use('/', indexRouter)
app.use('/todos', todoRouter)

// export the app object to server.js where we referred to this
export default app
