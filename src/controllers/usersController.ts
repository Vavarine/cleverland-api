import { User } from '@prisma/client'
import { prisma } from '../database'

export const usersController = {
	async create(user: User) {
		const createdUser = await prisma.user.create({
			data: user
		})

		return createdUser
	},

	async index() {
		const users = await prisma.user.findMany()

		return users
	},

	async showByEmail(email: string) {
		const user = await prisma.user.findUnique({ where: { email: email } })

		return user
	}
}
