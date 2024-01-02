import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FastifyReply } from 'fastify';
import { ZodError, typeToFlattenedError } from 'zod';
import { HttpStatusCode } from '../utils';

export default class ApiError<T> extends Error {
	type: 'error' = 'error';
	statusCode: number = 400;
	details?: T;

	constructor(statusCode: number, message: string, details?: T) {
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
		user: <T>(details?: T) => NotFoundError.user(details),
		todo: <T>(details?: T) => NotFoundError.todo(details),
	};

	static conflict = {
		user: {
			email: <T>(details?: T) => ConflictError.user.email(details),
			username: <T>(details?: T) => ConflictError.user.username(details),
		},
	};

	static validation = {
		user: <T>(zError: ZodError<T>) => ValidationError.user(zError),
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

class ValidationError<T> extends ApiError<typeToFlattenedError<T>> {
	constructor(message: string, error: ZodError<T>) {
		super(HttpStatusCode.BAD_REQUEST, message, error.flatten());
	}

	static user<T>(error: ZodError<T>) {
		return new ValidationError('Invalid user data', error);
	}
}

class NotFoundError<T> extends ApiError<T> {
	constructor(message: string, details?: T) {
		super(HttpStatusCode.NOT_FOUND, message, details);
	}

	static user<T>(details?: T) {
		return new NotFoundError('User not found', details);
	}

	static todo<T>(details?: T) {
		return new NotFoundError('Todo not found', details);
	}
}

class ConflictError<T> extends ApiError<T> {
	constructor(message: string, details?: T) {
		super(HttpStatusCode.CONFLICT, message, details);
	}

	static user = {
		email: <T>(details?: T) =>
			new ConflictError('Email already taken', details),
		username: <T>(details?: T) =>
			new ConflictError('Username already taken', details),
	};
}
