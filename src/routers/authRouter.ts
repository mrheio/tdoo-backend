import { FastifyPluginCallback } from 'fastify';
import authController from '../controllers/authController';

const authRouter: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.post('/signin', authController.signIn);
	fastify.post('/register', authController.register);
	fastify.post('/signout', authController.signOut);
	fastify.get('/me', authController.getMe);

	done();
};

export default authRouter;
