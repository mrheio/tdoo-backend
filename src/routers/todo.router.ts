import { FastifyPluginCallback } from 'fastify';
import TodoController from '../controllers/todo.controller';
import TodoSchema from '../schemas/todo.schema';

const todoRouter: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.post(
		'/',
		{ schema: { body: TodoSchema.create } },
		TodoController.create,
	);
	fastify.put(
		'/:id',
		{ schema: { body: TodoSchema.update } },
		TodoController.update,
	);
	fastify.delete('/:id', {}, TodoController.delete);
	fastify.get('/', {}, TodoController.getMany);
	fastify.get('/:id', {}, TodoController.getOne);

	done();
};

export default todoRouter;
