import { Router } from 'express'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.get('/', (req, res) => {
	return res.status(201).json({ message: 'Welcome to Cleverland API!' })
})

routes.use('/users', usersRoutes)

export default routes
