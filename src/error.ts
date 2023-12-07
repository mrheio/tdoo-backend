import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import ApiError from './models/ApiError';

const errorHandler = (
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	if (error instanceof ApiError) {
		return reply.code(error.statusCode).send(error.toJson());
	}

	throw error;
};

export default errorHandler;
