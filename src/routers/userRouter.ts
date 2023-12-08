import { FastifyPluginCallback } from 'fastify';
import userController from '../controllers/userController';
import querySchemas from '../schemas/querySchemas';

const userRouter: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.post('/', userController.createUser);
	fastify.put('/:id', userController.updateUser);
	fastify.delete('/:id', userController.deleteUser);

	fastify.route({
		url: '/',
		method: 'GET',
		schema: { querystring: querySchemas.getUsersQuery },
		handler: userController.getUsers,
	});

	fastify.get('/:id', userController.getUserById);

	done();
};

export default userRouter;
