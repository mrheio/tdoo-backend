import { FastifyPluginCallback } from 'fastify';
import todoController from '../controllers/todoController';
import todoSchemas from '../schemas/todoSchemas';

const schemas = {
	todoCreate: { body: todoSchemas.createTodo },
	todoUpdate: { body: todoSchemas.updateTodo },
};

const todoRouter: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.post(
		'/',
		{ schema: schemas.todoCreate },
		todoController.createTodo,
	);

	fastify.put(
		'/:id',
		{ schema: schemas.todoUpdate },
		todoController.updateTodo,
	);

	fastify.delete('/:id', {}, todoController.deleteTodo);

	fastify.get('/', {}, todoController.getTodos);
	fastify.get('/:id', {}, todoController.getTodoById);

	done();
};

export default todoRouter;
