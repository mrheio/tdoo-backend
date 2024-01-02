import { TokenError, createSigner, createVerifier } from 'fast-jwt';
import ApiError from '../models/ApiError';

const signJwt = async (payload: any, expiresIn: string) => {
	const sign = createSigner({
		key: async () => process.env.JWT_SECRET,
		expiresIn,
	});
	const jwt = await sign(payload);
	return jwt;
};

const verifyJwt = async (jwt: string) => {
	try {
		const verify = createVerifier({
			key: async () => process.env.JWT_SECRET,
		});
		const payload = await verify(jwt);
		return payload;
	} catch (e) {
		if (e instanceof TokenError) {
			if (e.code === 'FAST_JWT_EXPIRED') {
				throw ApiError.unauthorized('The token has expired');
			}
		}
		throw e;
	}
};

const JwtService = { signJwt, verifyJwt };

export default JwtService;
