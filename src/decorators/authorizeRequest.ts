import { TokenError } from 'fast-jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import ApiError from '../models/ApiError';
import JwtService from '../services/jwt.service';
import { extractBearerToken } from '../utils';

const authorizeRequest = async (req: FastifyRequest, reply: FastifyReply) => {
	if (!req.headers.authorization) {
		throw ApiError.unauthorized();
	}

	try {
		const token = extractBearerToken(req.headers.authorization);
		await JwtService.verifyJwt(token);
	} catch (e) {
		if (e instanceof TokenError) {
			if (e.code === 'FAST_JWT_EXPIRED') {
				throw ApiError.unauthorized({ refresh: true });
			}
		}
		throw e;
	}
};

export default authorizeRequest;
