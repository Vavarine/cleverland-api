import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes/index.routes'
import { errorsHandler } from './errors/errorsHandler'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use(errorsHandler)

app.listen(process.env.PORT || 3333, () => {
	console.log(`🚀 Server started on port ${process.env.PORT || 3333}!`)
})
