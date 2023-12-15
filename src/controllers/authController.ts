import { FastifyReply, FastifyRequest } from 'fastify';
import ApiSuccess from '../models/ApiSuccess';
import authService from '../services/authService';
import { RegisterData, SignInData } from '../types';
import { Cookie, extractBearerToken } from '../utils';

const signIn = async (
	req: FastifyRequest<{ Body: SignInData }>,
	reply: FastifyReply,
) => {
	const data = await authService.signIn(req.body);
	Cookie.accessToken.set(data.accessToken, reply);
	Cookie.refreshToken.set(data.refreshToken, reply);
	return ApiSuccess.ok(data).send(reply);
};

const signOut = (req: FastifyRequest, reply: FastifyReply) => {
	Cookie.accessToken.clear(reply);
	Cookie.refreshToken.clear(reply);
	return ApiSuccess.ok(null).send(reply);
};

const register = async (
	req: FastifyRequest<{ Body: RegisterData }>,
	reply: FastifyReply,
) => {
	const data = await authService.register(req.body);
	Cookie.accessToken.set(data.accessToken, reply);
	Cookie.refreshToken.set(data.refreshToken, reply);
	return ApiSuccess.ok(data).send(reply);
};

const getMe = async (req: FastifyRequest, reply: FastifyReply) => {
	if (!req.headers.authorization) {
		return ApiSuccess.ok(null).send(reply);
	}

	const token = extractBearerToken(req.headers.authorization);
	const data = await authService.decodeJwt(token);
	return ApiSuccess.ok(data).send(reply);
};

const authController = {
	signIn,
	signOut,
	register,
	getMe,
};

export default authController;
