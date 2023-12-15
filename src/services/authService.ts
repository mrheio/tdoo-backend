import bcrypt from 'bcrypt';
import { createDecoder, createSigner, createVerifier } from 'fast-jwt';
import prisma from '../db';
import { RegisterData, SignInData } from '../types';
import userService from './userService';

const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt();
	return bcrypt.hash(password, salt);
};

const verifyPassword = (password: string, hashedPassword: string) => {
	return bcrypt.compare(password, hashedPassword);
};

const signJwt = async (payload: any, expiresIn: string) => {
	const sign = createSigner({
		key: async () => process.env.JWT_SECRET,
		expiresIn,
	});
	const jwt = await sign(payload);
	return jwt;
};

const decodeJwt = async (jwt: string) => {
	const decode = createDecoder();
	const payload = await decode(jwt);
	return payload;
};

const verifyJwt = async (jwt: string) => {
	const verify = createVerifier({ key: async () => process.env.JWT_SECRET });
	const payload = await verify(jwt);
	return payload;
};

const signIn = async (data: SignInData) => {
	try {
		const user = await prisma.user.findUnique({
			where: { username: data.username },
		});

		if (!user) {
			// TODO: throw error
			throw Error();
		}

		const doPasswordsMatch = await verifyPassword(
			data.password,
			user.password,
		);

		if (!doPasswordsMatch) {
			throw Error();
			// TODO: throw error
		}

		const accessToken = await signJwt(
			{
				email: user?.email,
				username: user?.username,
			},
			'15s',
		);
		const refreshToken = await signJwt({ id: user?.id }, '30d');

		return { accessToken, refreshToken };
	} catch (e) {
		console.log(e);
		throw e;
	}
};

const register = async (payload: RegisterData) => {
	const password = await hashPassword(payload.password);
	const user = await userService.create({
		username: payload.username,
		email: payload.email,
		password,
	});

	const accessToken = await signJwt(
		{
			email: user?.email,
			username: user?.username,
		},
		'15s',
	);
	const refreshToken = await signJwt({ id: user?.id }, '30d');

	return { accessToken, refreshToken };
};

const authService = { signJwt, decodeJwt, verifyJwt, signIn, register };

export default authService;
