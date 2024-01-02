import { FastifyReply, FastifyRequest } from 'fastify';
import ApiSuccess from '../models/ApiSuccess';
import TodoService from '../services/todo.service';
import { CreateTodoData, UpdateTodoData } from '../types';

const createTodo = async (
	req: FastifyRequest<{ Body: CreateTodoData }>,
	reply: FastifyReply,
) => {
	const data = await TodoService.create(req.body);
	return ApiSuccess.created(data).send(reply);
};

const updateTodo = async (
	req: FastifyRequest<{ Params: { id: string }; Body: UpdateTodoData }>,
	reply: FastifyReply,
) => {
	const data = await TodoService.update(req.params.id, req.body);
	return ApiSuccess.ok(data).send(reply);
};

const deleteTodo = async (
	req: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	await TodoService.delete(req.params.id);
	return ApiSuccess.noContent().send(reply);
};

const getTodos = async (
	req: FastifyRequest<{ Querystring: { user_id?: string } }>,
	reply: FastifyReply,
) => {
	const data = await TodoService.get.many({ user_id: req.query.user_id });
	return ApiSuccess.ok(data).send(reply);
};

const getTodoById = async (
	req: FastifyRequest<{
		Params: { id: string };
	}>,
	reply: FastifyReply,
) => {
	const data = await TodoService.get.one(req.params.id);
	return ApiSuccess.ok(data).send(reply);
};

const TodoController = {
	create: createTodo,
	update: updateTodo,
	delete: deleteTodo,
	getMany: getTodos,
	getOne: getTodoById,
};

export default TodoController;
