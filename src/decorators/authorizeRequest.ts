import { TokenError } from 'fast-jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import ApiError from '../models/ApiError';
import authService from '../services/authService';
import { extractBearerToken } from '../utils';

const authorizeRequest = async (req: FastifyRequest, reply: FastifyReply) => {
	if (!req.headers.authorization) {
		throw ApiError.unauthorized();
	}

	try {
		const token = extractBearerToken(req.headers.authorization);
		await authService.verifyJwt(token);
	} catch (e) {
		if (e instanceof TokenError) {
			if (e.code === 'FAST_JWT_EXPIRED') {
				throw ApiError.unauthorized('Token expired');
			}
		}
		throw e;
	}
};

export default authorizeRequest;
