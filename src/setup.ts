import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import { FastifyEnvOptions, fastifyEnv } from '@fastify/env';
import fastify from 'fastify';
import authorizeRequest from './decorators/authorizeRequest';
import authRouter from './routers/auth.router';
import todoRouter from './routers/todo.router';
import userRouter from './routers/user.router';
import { errorHandler, zodValidatorCompiler } from './utils';

const opts = {
	fastify: {
		logger: {
			transport: {
				target: '@fastify/one-line-logger',
				options: {
					colorize: true,
				},
			},
		},
	},
	env: {
		dotenv: true,
		schema: {
			type: 'object',
			properties: {
				PORT: { type: 'number' },
			},
		},
	},
};

export const buildServer = async (envOptions: FastifyEnvOptions = opts.env) => {
	const server = fastify(opts.fastify);

	server.setValidatorCompiler(zodValidatorCompiler);
	server.setErrorHandler(errorHandler);

	await server.register(cors, {
		origin: ['http://localhost:5173'],
		credentials: true,
	});
	await server.register(fastifyEnv, envOptions);
	await server.register(fastifyCookie);

	server.decorate('authorize', authorizeRequest);

	server.register(
		(fastify, _, done) => {
			fastify.register(authRouter, { prefix: '/auth' });
			fastify.register(userRouter, { prefix: '/users' });
			fastify.register(todoRouter, { prefix: '/todos' });

			done();
		},
		{ prefix: '/api' },
	);

	return server;
};
