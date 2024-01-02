import prisma from '../db';
import ApiError from '../models/ApiError';
import { RegisterData, SigninData, User } from '../types';
import { hashPassword, verifyPassword } from '../utils';
import jwtService from './jwt.service';
import UserService from './user.service';

const getTokens = async (user: User) => {
	const accessToken = await jwtService.signJwt(
		{
			id: user?.id,
			email: user?.email,
			username: user?.username,
		},
		'15s',
	);
	const refreshToken = await jwtService.signJwt({ id: user?.id }, '30d');
	return { accessToken, refreshToken };
};

const signin = async (data: SigninData) => {
	try {
		const user = await prisma.user.findUnique({
			where: { username: data.username },
		});

		if (!user) {
			throw ApiError.invalidCredentials();
		}

		const doPasswordsMatch = await verifyPassword(
			data.password,
			user.password,
		);

		if (!doPasswordsMatch) {
			throw ApiError.invalidCredentials();
		}

		return getTokens(user);
	} catch (e) {
		throw e;
	}
};

const register = async (payload: RegisterData) => {
	const password = await hashPassword(payload.password);
	const user = await UserService.create({
		username: payload.username,
		email: payload.email,
		password,
	});
	return getTokens(user);
};

const getSession = async (token: string) => {
	const data = await jwtService.verifyJwt(token);
	return data;
};

const refreshSession = async (refreshToken: string) => {
	const payload = await jwtService.verifyJwt(refreshToken);
	const user = await UserService.get.one(payload.id);
	return getTokens(user);
};

const AuthService = {
	signin,
	register,
	refreshSession,
	getSession,
};

export default AuthService;
