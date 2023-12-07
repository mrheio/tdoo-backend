import { FastifyEnvOptions, fastifyEnv } from '@fastify/env';
import fastify, { FastifyPluginCallback } from 'fastify';
import { PinoLoggerOptions } from 'fastify/types/logger';
import errorHandler from './error';
import userRouter from './routers/userRouter';

const loggerOptions: PinoLoggerOptions = {
	transport: {
		target: '@fastify/one-line-logger',
		options: {
			colorize: true,
		},
	},
};

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
	logger: loggerOptions,
});

const apiHandler: FastifyPluginCallback = (fastify, _, done) => {
	fastify.register(userRouter, { prefix: '/users' });

	done();
};

(async () => {
	await server.register(fastifyEnv, envOptions);

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
