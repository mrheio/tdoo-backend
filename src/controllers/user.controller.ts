import { FastifyReply, FastifyRequest } from 'fastify';
import ApiSuccess from '../models/ApiSuccess';
import UserService from '../services/user.service';
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
	const data = await UserService.create(req.body);
	return ApiSuccess.created(data).send(reply);
};

const updateUser = async (
	req: FastifyRequest<{ Params: { id: string }; Body: UpdateUserData }>,
	reply: FastifyReply,
) => {
	const data = await UserService.update(req.params.id, req.body);
	return ApiSuccess.ok(data).send(reply);
};

const deleteUser = async (
	req: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	await UserService.delete(req.params.id);
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

	const data = await UserService.get.many(filters);
	return ApiSuccess.ok(data).send(reply);
};

const getUserById = async (
	req: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	const data = await UserService.get.one(req.params.id);
	return ApiSuccess.ok(data).send(reply);
};

const UserController = {
	create: createUser,
	update: updateUser,
	delete: deleteUser,
	getMany: getUsers,
	getOne: getUserById,
};

export default UserController;
