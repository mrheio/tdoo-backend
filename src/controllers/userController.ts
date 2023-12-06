import { RouteHandlerMethod } from 'fastify';
import prisma from '../db';
import ApiResponse from '../models/ApiResponse';

const createUser: RouteHandlerMethod = async (request, reply) => {
	const data = request.body;
	await prisma.user.create(data);
	return new ApiResponse('success', data);
};

const getUsers: RouteHandlerMethod = async (request, reply) => {
	const data = await prisma.user.findMany();
	return new ApiResponse('success', data);
};

const getUserById: RouteHandlerMethod = async (request, reply) => {
	const { id } = request.params;
	const data = await prisma.user.findUnique({ where: { id } });
	return new ApiResponse('success', data);
};

const updateUser: RouteHandlerMethod = async (request, reply) => {
	const { id } = request.params;
	const newData = request.body;
	const data = await prisma.user.update({
		where: { id },
		data: newData,
	});
	return new ApiResponse('success', data);
};

const deleteUser: RouteHandlerMethod = async (request, reply) => {
	const { id } = request.params;
	await prisma.user.delete({ where: { id } });
	return new ApiResponse('success', {});
};

const userController = {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
};

export default userController;
