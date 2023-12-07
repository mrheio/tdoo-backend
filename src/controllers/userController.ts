import { FastifyReply, FastifyRequest } from 'fastify';
import ApiResponse from '../models/ApiResponse';
import userService from '../services/userService';

const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
	const { body } = request;

	const data = await userService.createUser(body);

	return reply.send(ApiResponse.success(data));
};

const updateUser = async (
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	const { body } = request;
	const { id } = request.params;

	const data = await userService.updateUser(id, body);

	return reply.send(ApiResponse.success(data));
};

const deleteUser = async (
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	const { id } = request.params;

	const data = await userService.deleteUser(id);

	return reply.send(ApiResponse.success(data));
};

const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
	const data = await userService.getMany();

	return reply.send(ApiResponse.success(data));
};

const getUserById = async (
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	const { id } = request.params;

	const data = await userService.getOneById(id);

	return reply.send(ApiResponse.success(data));
};

const userController = {
	createUser,
	updateUser,
	deleteUser,
	getUsers,
	getUserById,
};

export default userController;
