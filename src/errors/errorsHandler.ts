import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
	[key: string]: string[]
}
interface constraintErrors {
	[key: string]: string[]
}

const errorsHandler: ErrorRequestHandler = (error, req, res, next) => {
	console.log('error type', typeof error)
	console.log(error)
	console.log('error message', error.message)

	if (error instanceof ValidationError) {
		const errors: ValidationErrors = {}

		error.inner.forEach((err: any) => {
			errors[err.path] = err.errors
		})

		return res.status(400).json({
			type: 'validation_errors',
			message: 'Request body fields do not match criteria',
			errors
		})
	}

	if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
		const errors = {}
		const { target } = error.meta as { target: string[] }

		target.forEach((target) => {
			errors[target] = `Should be unique`
		})

		return res.status(400).json({
			type: 'constraint_errors',
			message: 'Request body fields do not match database contraints',
			errors
		})
	}

	return res.status(500).json({ type: 'unknown', message: 'Internal server error' })
}

export { errorsHandler }
