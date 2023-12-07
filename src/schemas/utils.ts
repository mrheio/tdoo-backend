import { FastifySchemaCompiler } from 'fastify';
import { ZodSchema } from 'zod';
import ApiError from '../models/ApiError';

export const zodValidatorCompiler: FastifySchemaCompiler<ZodSchema> =
	({ schema }) =>
	(data) => {
		const result = schema.safeParse(data);

		if (!result.success) {
			return {
				error: ApiError.badRequest(
					'Invalid data format',
					result.error.flatten(),
				),
			};
		}

		return { value: result.data };
	};
