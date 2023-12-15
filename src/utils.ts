import { FastifyReply, FastifyRequest } from 'fastify';

export const extractBearerToken = (authorizationHeader: string) => {
	return authorizationHeader.split(' ')[1];
};

const ACCESS_TOKEN_MAX_AGE = 60 * 15;
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30;

export const Cookie = {
	accessToken: {
		get: (req: FastifyRequest) => req.cookies.access_token,
		set: (value: string, reply: FastifyReply) =>
			reply.setCookie('access_token', value, {
				httpOnly: true,
				sameSite: true,
				maxAge: ACCESS_TOKEN_MAX_AGE,
			}),
		clear: (reply: FastifyReply) => reply.clearCookie('access_token'),
	},
	refreshToken: {
		get: (req: FastifyRequest) => req.cookies.refresh_token,
		set: (value: string, reply: FastifyReply) =>
			reply.setCookie('refresh_token', value, {
				httpOnly: true,
				sameSite: true,
				maxAge: REFRESH_TOKEN_MAX_AGE,
			}),
		clear: (reply: FastifyReply) => reply.clearCookie('refresh_token'),
	},
};
