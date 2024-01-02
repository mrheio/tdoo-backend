import { FastifyPluginCallback } from 'fastify';
import authController from '../controllers/auth.controller';
import AuthSchema from '../schemas/auth.schema';

const authRouter: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.post(
		'/signin',
		{ schema: { body: AuthSchema.signin } },
		authController.signin,
	);
	fastify.post(
		'/register',
		{ schema: { body: AuthSchema.register } },
		authController.register,
	);
	fastify.post('/signout', authController.signout);
	fastify.get('/me', authController.getMe);
	fastify.post('/refresh', authController.refresh);

	done();
};

export default authRouter;
