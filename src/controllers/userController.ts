import { FastifyReply, FastifyRequest } from 'fastify';
import HttpStatusCode from '../http';
import ApiSuccess from '../models/ApiSuccess';
import userService from '../services/userService';

const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
	const { body } = request;

	const data = await userService.createUser(body);

	return reply.send(ApiSuccess.created(data));
};

const updateUser = async (
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	const { body } = request;
	const { id } = request.params;

	const data = await userService.updateUser(id, body);

	return reply.send(ApiSuccess.ok(data));
};

const deleteUser = async (
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	const { id } = request.params;

	const data = await userService.deleteUser(id);

	return reply.code(HttpStatusCode.NO_CONTENT).send();
};

const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
	const data = await userService.getMany();

	return reply.send(ApiSuccess.ok(data));
};

const getUserById = async (
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	const { id } = request.params;

	const data = await userService.getOneById(id);

	return reply.send(ApiSuccess.ok(data));
};

const userController = {
	createUser,
	updateUser,
	deleteUser,
	getUsers,
	getUserById,
};

export default userController;
