import { Router } from 'express'
import { usersService } from '../services/usersService'

const usersRoutes = Router()

usersRoutes.post('/', usersService.create)
usersRoutes.get('/', usersService.index)
usersRoutes.get('/auth', usersService.auth)

export { usersRoutes }
