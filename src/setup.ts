import fastifyCookie from '@fastify/cookie';
import { FastifyEnvOptions, fastifyEnv } from '@fastify/env';
import fastify, { FastifyPluginCallback } from 'fastify';
import authorizeRequest from './decorators/authorizeRequest';
import errorHandler from './error';
import authRouter from './routers/authRouter';
import todoRouter from './routers/todoRouter';
import userRouter from './routers/userRouter';
import { zodValidatorCompiler } from './schemas/utils';

const envvOptions: FastifyEnvOptions = {
	dotenv: true,
	schema: {
		type: 'object',
		required: ['HOST', 'PORT'],
		properties: {
			HOST: { type: 'string' },
			PORT: { type: 'number' },
		},
	},
};

const apiHandler: FastifyPluginCallback = (fastify, _, done) => {
	fastify.register(authRouter, { prefix: '/auth' });
	fastify.register(userRouter, { prefix: '/users' });
	fastify.register(todoRouter, { prefix: '/todos' });

	done();
};

export const buildServer = async (
	envOptions: FastifyEnvOptions = envvOptions,
) => {
	const server = fastify({
		logger: {
			transport: {
				target: '@fastify/one-line-logger',
				options: {
					colorize: true,
				},
			},
		},
	});

	await server.register(fastifyEnv, envOptions);
	server.register(fastifyCookie);
	server.decorate('authorize', authorizeRequest);

	server.setValidatorCompiler(zodValidatorCompiler);
	server.setErrorHandler(errorHandler);

	server.register(apiHandler, { prefix: '/api' });

	return server;
};
