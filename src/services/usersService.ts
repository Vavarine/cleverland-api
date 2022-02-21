import * as yup from 'yup'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '@prisma/client'
import { usersController } from '../controllers/usersController'

import { Request, Response } from 'express'
import { usersView } from '../views/usersView'

export const usersService = {
	async create(req: Request, res: Response) {
		const data: User = req.body
		const saltRounds = process.env.SALT_ROUNDS

		const schema = yup.object().shape({
			name: yup.string().required().max(100),
			email: yup.string().required().max(100),
			password: yup.string().required().max(100).min(6)
		})

		await schema.validate(req.body, { abortEarly: false })

		const hash = await bcrypt.hash(data.password, Number(saltRounds))
		const user = await usersController.create({ ...data, password: hash })

		return res.status(201).json(usersView.render(user))
	},

	async index(req: Request, res: Response) {
		const users = await usersController.index()

		return res.status(200).json(usersView.renderMany(users))
	},

	async auth(req: Request, res: Response) {
		const data = req.body as { email: string; password: string }

		const schema = yup.object().shape({
			email: yup.string().required().max(100),
			password: yup.string().required().min(6).max(100)
		})

		await schema.validate(data, { abortEarly: false })

		const { email, password } = data

		const fechedUser = await usersController.showByEmail(email)

		if (!fechedUser) {
			return res.status(404).json({ type: 'NOT_FOUND', message: 'User not found', auth: false })
		}

		const auth = await bcrypt.compare(password, fechedUser.password)

		if (!auth) return res.status(401).json({ auth: false })

		const token = jwt.sign(
			{ id: fechedUser.id },
			process.env.JWT_SECRET,
			{ expiresIn: 60 * 60 * 30 } // 30 days
		)

		return res
			.status(200)
			.json({ auth: true, user: usersView.render(fechedUser), authToken: token })
	}
}
