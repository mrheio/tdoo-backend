import { FastifyPluginCallback } from 'fastify';
import userController from '../controllers/userController';

const userRouter: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.get('', userController.getUsers);

	done();
};

export default userRouter;
