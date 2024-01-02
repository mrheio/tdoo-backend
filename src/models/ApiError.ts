import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { HttpStatusCode } from '../utils';

export default class ApiError<T> extends Error {
	type: 'error' = 'error';
	statusCode: number = 400;
	details?: T;

	private constructor(statusCode: number, message: string, details?: T) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
	}

	toJson() {
		return {
			type: this.type,
			statusCode: this.statusCode,
			message: this.message,
			details: this.details,
		};
	}

	send(reply: FastifyReply) {
		return reply.code(this.statusCode).send(this.toJson());
	}

	static badRequest<T>(message: string, details?: T) {
		return new ApiError<T>(HttpStatusCode.BAD_REQUEST, message, details);
	}

	static unauthorized<T>(details?: T) {
		return new ApiError(
			HttpStatusCode.UNAUTHORIZED,
			'Unauthorized request',
			details ?? null,
		);
	}

	static invalidCredentials() {
		return new ApiError(HttpStatusCode.UNAUTHORIZED, 'Invalid credentials');
	}

	static notFound = {
		user: <T>(details?: T) =>
			new ApiError<T>(
				HttpStatusCode.NOT_FOUND,
				'User not found',
				details,
			),
		todo: <T>(details?: T) =>
			new ApiError<T>(
				HttpStatusCode.NOT_FOUND,
				'Todo not found',
				details,
			),
	};

	static conflict = {
		user: {
			email: <T>(details?: T) =>
				new ApiError<T>(
					HttpStatusCode.CONFLICT,
					'Email already taken',
					details,
				),
			username: <T>(details?: T) =>
				new ApiError<T>(
					HttpStatusCode.CONFLICT,
					'Username already taken',
					details,
				),
		},
	};

	static validation = {
		user: <T>(zError: ZodError<T>) =>
			ApiError.badRequest('Invalid user data', zError.flatten()),
	};

	static maybeFromPrisma(error: unknown, resource: 'user' | 'todo' = 'user') {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				if (resource === 'user') {
					return ApiError.notFound.user();
				}
				if (resource === 'todo') {
					return ApiError.notFound.todo();
				}
			}

			if (error.code === 'P2002') {
				if (resource === 'user') {
					if ((error.meta?.target as any[0]) === 'email') {
						return ApiError.conflict.user.email();
					}
					if ((error.meta?.target as any[0]) === 'username') {
						return ApiError.conflict.user.username();
					}
				}
			}

			return error;
		}

		return error;
	}
}
