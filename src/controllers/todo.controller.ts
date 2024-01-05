import { FastifyReply } from 'fastify';
import ApiSuccess from '../models/ApiSuccess';
import TodoService from '../services/todo.service';
import {
	CreateTodoRequest,
	DeleteTodoRequest,
	GetTodoRequest,
	GetTodosRequest,
	UpdateTodoRequest,
} from '../types';

const createTodo = async (req: CreateTodoRequest, reply: FastifyReply) => {
	const data = await TodoService.create(req.body);
	return ApiSuccess.created(data).send(reply);
};

const updateTodo = async (req: UpdateTodoRequest, reply: FastifyReply) => {
	const data = await TodoService.update(req.params.id, req.body);
	return ApiSuccess.ok(data).send(reply);
};

const deleteTodo = async (req: DeleteTodoRequest, reply: FastifyReply) => {
	await TodoService.delete(req.params.id);
	return ApiSuccess.noContent().send(reply);
};

const getTodos = async (req: GetTodosRequest, reply: FastifyReply) => {
	const { query } = req;
	const filters = {
		...(query.user_id && { user_id: query.user_id }),
		...(query.order_by && {
			orderBy: { [query.order_by]: query.order_dir ?? 'asc' },
		}),
	};

	const data = await TodoService.get.many(filters);
	return ApiSuccess.ok(data).send(reply);
};

const getTodoById = async (req: GetTodoRequest, reply: FastifyReply) => {
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
