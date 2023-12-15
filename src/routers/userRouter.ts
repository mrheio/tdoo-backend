import { FastifyPluginCallback } from 'fastify';
import userController from '../controllers/userController';
import querySchemas from '../schemas/querySchemas';
import userSchemas from '../schemas/userSchemas';

const schemas = {
	userCreate: { body: userSchemas.createUser },
	userUpdate: { body: userSchemas.updateUser },
	getMany: { querystring: querySchemas.getUsersQuery },
};

const userRouter: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.post(
		'/',
		{ schema: schemas.userCreate },
		userController.createUser,
	);

	fastify.put(
		'/:id',
		{ schema: schemas.userUpdate },
		userController.updateUser,
	);

	fastify.delete('/:id', userController.deleteUser);

	fastify.get(
		'/',
		{ schema: schemas.getMany, onRequest: [fastify.authorize] },
		userController.getUsers,
	);
	fastify.get('/:id', userController.getUserById);

	done();
};

export default userRouter;
