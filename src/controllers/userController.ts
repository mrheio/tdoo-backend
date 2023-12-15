import { FastifyReply, FastifyRequest } from 'fastify';
import ApiSuccess from '../models/ApiSuccess';
import userService from '../services/userService';
import {
	CreateUserData,
	GetUsersFilters,
	GetUsersQueryParams,
	UpdateUserData,
} from '../types';

const createUser = async (
	req: FastifyRequest<{ Body: CreateUserData }>,
	reply: FastifyReply,
) => {
	const data = await userService.create(req.body);
	return ApiSuccess.created(data).send(reply);
};

const updateUser = async (
	req: FastifyRequest<{ Params: { id: string }; Body: UpdateUserData }>,
	reply: FastifyReply,
) => {
	const data = await userService.update(req.params.id, req.body);
	return ApiSuccess.ok(data).send(reply);
};

const deleteUser = async (
	req: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	await userService.delete(req.params.id);
	return ApiSuccess.noContent().send(reply);
};

const getUsers = async (
	req: FastifyRequest<{ Querystring: GetUsersQueryParams }>,
	reply: FastifyReply,
) => {
	const { order_by, order_dir, ...rest } = req.query;
	const filters: GetUsersFilters = {
		...rest,
		...(order_by && { orderBy: { [order_by]: order_dir } }),
	};

	const data = await userService.get.many(filters);
	return ApiSuccess.ok(data).send(reply);
};

const getUserById = async (
	req: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	const data = await userService.get.one(req.params.id);
	return ApiSuccess.ok(data).send(reply);
};

const userController = {
	createUser,
	updateUser,
	deleteUser,
	getUsers,
	getUserById,
};

export default userController;
