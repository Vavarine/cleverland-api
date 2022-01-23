import { User } from '@prisma/client'

export const usersView = {
	render(user: User) {
		return {
			id: user.id,
			name: user.name,
			email: user.email
		}
	},

	renderMany(users: User[]) {
		return users.map((user) => this.render(user))
	}
}
