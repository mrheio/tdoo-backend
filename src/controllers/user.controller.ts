import { FastifyReply } from 'fastify';
import ApiSuccess from '../models/ApiSuccess';
import UserService from '../services/user.service';
import {
	CreateUserRequest,
	DeleteUserRequest,
	GetUserByIdRequest,
	GetUsersRequest,
	UpdateUserRequest,
} from '../types';

const createUser = async (req: CreateUserRequest, reply: FastifyReply) => {
	const data = await UserService.create(req.body);
	return ApiSuccess.created(data).send(reply);
};

const updateUser = async (req: UpdateUserRequest, reply: FastifyReply) => {
	const data = await UserService.update(req.params.id, req.body);
	return ApiSuccess.ok(data).send(reply);
};

const deleteUser = async (req: DeleteUserRequest, reply: FastifyReply) => {
	await UserService.delete(req.params.id);
	return ApiSuccess.noContent().send(reply);
};

const getUsers = async (req: GetUsersRequest, reply: FastifyReply) => {
	const { query } = req;
	const filters = {
		...(query.email && { email: query.email }),
		...(query.username && { username: query.username }),
		...(query.order_by && {
			orderBy: { [query.order_by]: query.order_dir ?? 'asc' },
		}),
	};

	const data = await UserService.get.many(filters);
	return ApiSuccess.ok(data).send(reply);
};

const getUserById = async (req: GetUserByIdRequest, reply: FastifyReply) => {
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
