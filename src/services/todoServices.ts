import prisma from '../db';
import ApiError from '../models/ApiError';
import { CreateTodoData, UpdateTodoData } from '../types';

const createTodo = async (payload: CreateTodoData) => {
	const { user_id, ...rest } = payload;

	const res = await prisma.todo.create({
		data: { ...rest, user: { connect: { id: user_id } } },
	});

	return res;
};

const updateTodo = async (id: number | string, payload: UpdateTodoData) => {
	const res = await prisma.todo.update({
		data: payload,
		where: { id: Number(id) },
	});
	return res;
};

const deleteTodo = async (id: number | string) => {
	const res = await prisma.todo.delete({ where: { id: Number(id) } });
	return res;
};

const getMany = async (filters?: { user_id?: string }) => {
	const res = await prisma.todo.findMany({
		where: { user_id: filters?.user_id },
	});
	return res;
};

const getOneById = async (id: number | string) => {
	const res = await prisma.todo.findUnique({ where: { id: Number(id) } });

	if (!res) {
		throw ApiError.notFound.todo({ id });
	}

	return res;
};

const todoService = {
	create: createTodo,
	update: updateTodo,
	delete: deleteTodo,
	get: {
		many: getMany,
		one: getOneById,
	},
};

export default todoService;
