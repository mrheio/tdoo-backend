import { FastifyReply, FastifyRequest } from 'fastify';
import ApiSuccess from '../models/ApiSuccess';
import todoService from '../services/todoServices';
import { CreateTodoData, UpdateTodoData } from '../types';

const createTodo = async (
	req: FastifyRequest<{ Body: CreateTodoData }>,
	reply: FastifyReply,
) => {
	const data = await todoService.create(req.body);
	return ApiSuccess.created(data).send(reply);
};

const updateTodo = async (
	req: FastifyRequest<{ Params: { id: string }; Body: UpdateTodoData }>,
	reply: FastifyReply,
) => {
	const data = await todoService.update(req.params.id, req.body);
	return ApiSuccess.ok(data).send(reply);
};

const deleteTodo = async (
	req: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	await todoService.delete(req.params.id);
	return ApiSuccess.noContent().send(reply);
};

const getTodos = async (
	req: FastifyRequest<{ Querystring: { user_id?: string } }>,
	reply: FastifyReply,
) => {
	const data = await todoService.get.many({ user_id: req.query.user_id });
	return ApiSuccess.ok(data).send(reply);
};

const getTodoById = async (
	req: FastifyRequest<{
		Params: { id: string };
	}>,
	reply: FastifyReply,
) => {
	const data = await todoService.get.one(req.params.id);
	return ApiSuccess.ok(data).send(reply);
};

const todoController = {
	createTodo,
	updateTodo,
	deleteTodo,
	getTodos,
	getTodoById,
};

export default todoController;
