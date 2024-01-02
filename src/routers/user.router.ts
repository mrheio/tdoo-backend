import { FastifyPluginCallback } from 'fastify';
import UserController from '../controllers/user.controller';
import QuerySchema from '../schemas/query.schema';
import UserSchemas from '../schemas/user.schema';

const userRouter: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.post(
		'/',
		{ schema: { body: UserSchemas.create } },
		UserController.create,
	);
	fastify.put(
		'/:id',
		{ schema: { body: UserSchemas.update } },
		UserController.update,
	);
	fastify.delete('/:id', UserController.delete);
	fastify.get(
		'/',
		{ schema: { querystring: QuerySchema.request.getUsers } },
		UserController.getMany,
	);
	fastify.get('/:id', UserController.getOne);

	done();
};

export default userRouter;
