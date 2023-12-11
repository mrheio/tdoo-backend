import { FastifyEnvOptions, fastifyEnv } from '@fastify/env';
import fastify, { FastifyPluginCallback } from 'fastify';
import errorHandler from './error';
import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
import { zodValidatorCompiler } from './schemas/utils';

const envOptions: FastifyEnvOptions = {
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

const apiHandler: FastifyPluginCallback = (fastify, _, done) => {
	fastify.register(authRouter, { prefix: '/auth' });
	fastify.register(userRouter, { prefix: '/users' });

	done();
};

(async () => {
	await server.register(fastifyEnv, envOptions);
	server.setValidatorCompiler(zodValidatorCompiler);
	server.register(apiHandler, { prefix: '/api' });
	server.setErrorHandler(errorHandler);

	server.listen(
		{ host: process.env.HOST, port: process.env.PORT },
		(err, address) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}

			console.log(`Server listening at ${address}`);
		},
	);
})();
