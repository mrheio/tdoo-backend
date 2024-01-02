'use strict';

import bcrypt from 'bcrypt';
import {
	FastifyError,
	FastifyReply,
	FastifyRequest,
	FastifySchemaCompiler,
} from 'fastify';
import { ZodSchema } from 'zod';
import ApiError from './models/ApiError';

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

export const errorHandler = (
	error: FastifyError,
	_: FastifyRequest,
	reply: FastifyReply,
) => {
	if (error instanceof ApiError) {
		return error.send(reply);
	}

	throw error;
};

export const extractBearerToken = (authorizationHeader: string) => {
	return authorizationHeader.split(' ')[1];
};

export const Cookie = {
	accessToken: {
		get: (req: FastifyRequest) => req.cookies.access_token,
		set: (value: string, reply: FastifyReply) =>
			reply.setCookie('access_token', value, {
				httpOnly: true,
			}),
		clear: (reply: FastifyReply) => reply.setCookie('access_token', ''),
	},
	refreshToken: {
		get: (req: FastifyRequest) => req.cookies.refresh_token,
		set: (value: string, reply: FastifyReply) =>
			reply.setCookie('refresh_token', value, {
				httpOnly: true,
			}),
		clear: (reply: FastifyReply) => reply.setCookie('refresh_token', ''),
	},
};

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt();
	return bcrypt.hash(password, salt);
};

export const verifyPassword = (password: string, hashedPassword: string) => {
	return bcrypt.compare(password, hashedPassword);
};

export enum HttpStatusCode {
	CONTINUE = 100,
	SWITCHING_PROTOCOLS = 101,
	PROCESSING = 102,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NON_AUTHORITATIVE_INFORMATION = 203,
	NO_CONTENT = 204,
	RESET_CONTENT = 205,
	PARTIAL_CONTENT = 206,
	MULTI_STATUS = 207,
	ALREADY_REPORTED = 208,
	IM_USED = 226,
	MULTIPLE_CHOICES = 300,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	SEE_OTHER = 303,
	NOT_MODIFIED = 304,
	USE_PROXY = 305,
	SWITCH_PROXY = 306,
	TEMPORARY_REDIRECT = 307,
	PERMANENT_REDIRECT = 308,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	PROXY_AUTHENTICATION_REQUIRED = 407,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	LENGTH_REQUIRED = 411,
	PRECONDITION_FAILED = 412,
	PAYLOAD_TOO_LARGE = 413,
	URI_TOO_LONG = 414,
	UNSUPPORTED_MEDIA_TYPE = 415,
	RANGE_NOT_SATISFIABLE = 416,
	EXPECTATION_FAILED = 417,
	I_AM_A_TEAPOT = 418,
	MISDIRECTED_REQUEST = 421,
	UNPROCESSABLE_ENTITY = 422,
	LOCKED = 423,
	FAILED_DEPENDENCY = 424,
	UPGRADE_REQUIRED = 426,
	PRECONDITION_REQUIRED = 428,
	TOO_MANY_REQUESTS = 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
	UNAVAILABLE_FOR_LEGAL_REASONS = 451,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
	HTTP_VERSION_NOT_SUPPORTED = 505,
	VARIANT_ALSO_NEGOTIATES = 506,
	INSUFFICIENT_STORAGE = 507,
	LOOP_DETECTED = 508,
	NOT_EXTENDED = 510,
	NETWORK_AUTHENTICATION_REQUIRED = 511,
}
