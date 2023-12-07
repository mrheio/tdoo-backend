import { FastifyPluginCallback } from 'fastify';
import userController from '../controllers/userController';

const userRouter: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.post('/', userController.createUser);
	fastify.put('/:id', userController.updateUser);
	fastify.delete('/:id', userController.deleteUser);
	fastify.get('/', userController.getUsers);
	fastify.get('/:id', userController.getUserById);

	done();
};

export default userRouter;
