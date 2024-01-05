import { FastifyReply, FastifyRequest } from 'fastify';
import ApiError from '../models/ApiError';
import ApiSuccess from '../models/ApiSuccess';
import AuthService from '../services/auth.service';
import { RegisterRequest, SignInRequest } from '../types';
import { Cookie } from '../utils';

const signin = async (req: SignInRequest, reply: FastifyReply) => {
	const data = await AuthService.signin(req.body);
	Cookie.accessToken.set(data.accessToken, reply);
	Cookie.refreshToken.set(data.refreshToken, reply);
	return ApiSuccess.ok(data).send(reply);
};

const signout = (req: FastifyRequest, reply: FastifyReply) => {
	Cookie.accessToken.clear(reply);
	Cookie.refreshToken.clear(reply);
	return ApiSuccess.ok(null).send(reply);
};

const register = async (req: RegisterRequest, reply: FastifyReply) => {
	const data = await AuthService.register(req.body);
	Cookie.accessToken.set(data.accessToken, reply);
	Cookie.refreshToken.set(data.refreshToken, reply);
	return ApiSuccess.ok(data).send(reply);
};

const getMe = async (req: FastifyRequest, reply: FastifyReply) => {
	const token = Cookie.accessToken.get(req);

	if (!token) {
		return ApiSuccess.ok(null).send(reply);
	}

	const data = await AuthService.getSession(token);
	return ApiSuccess.ok(data).send(reply);
};

const refresh = async (req: FastifyRequest, reply: FastifyReply) => {
	const token = Cookie.refreshToken.get(req);

	if (!token) {
		return ApiError.unauthorized('No refresh token provided');
	}

	const data = await AuthService.refreshSession(token);
	Cookie.accessToken.set(data.accessToken, reply);
	Cookie.refreshToken.set(data.refreshToken, reply);
	return ApiSuccess.ok(data).send(reply);
};

const AuthController = {
	signin,
	signout,
	register,
	getMe,
	refresh,
};

export default AuthController;
