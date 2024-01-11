import prisma from '../db';
import ApiError from '../models/ApiError';
import { CreateUserData, GetUsersFilters, UpdateUserData } from '../types';

const createUser = async (payload: CreateUserData) => {
	try {
		const res = await prisma.user.create({ data: payload });
		return res;
	} catch (err) {
		throw ApiError.maybeFromPrisma(err);
	}
};

const updateUser = async (id: string, payload: UpdateUserData) => {
	try {
		const res = await prisma.user.update({
			where: { id },
			data: payload,
		});
		return res;
	} catch (err) {
		throw ApiError.maybeFromPrisma(err);
	}
};

const deleteUser = async (id: string) => {
	try {
		const res = await prisma.user.delete({ where: { id } });
		return res;
	} catch (err) {
		throw ApiError.maybeFromPrisma(err);
	}
};

const getMany = async (filters?: GetUsersFilters) => {
	const data = await prisma.user.findMany({
		orderBy: filters?.orderBy,
		where: {
			email: { contains: filters?.email },
			username: { contains: filters?.username },
		},
	});

	return data.map((user) => {
		const { password, ...rest } = user;
		return rest;
	});
};

const getOneById = async (id: string) => {
	const data = await prisma.user.findUnique({ where: { id } });

	if (!data) {
		throw ApiError.notFound.user({ id });
	}

	const { password, ...rest } = data;
	return rest;
};

const UserService = {
	create: createUser,
	update: updateUser,
	delete: deleteUser,
	get: {
		many: getMany,
		one: getOneById,
	},
};

export default UserService;
