import prisma from '../db';
import ApiError from '../models/ApiError';
import userSchemas from '../schemas/userSchemas';
import { GetUsersFilters } from '../types';

const createUser = async (payload: unknown) => {
	const validation = userSchemas.createUser.safeParse(payload);

	if (!validation.success) {
		throw ApiError.validation.user(validation.error);
	}

	try {
		const res = await prisma.user.create({ data: validation.data });
		return res;
	} catch (err) {
		throw ApiError.maybeFromPrisma(err);
	}
};

const updateUser = async (id: string, payload: unknown) => {
	const validation = userSchemas.updateUser.safeParse(payload);

	if (!validation.success) {
		throw ApiError.validation.user(validation.error);
	}

	try {
		const res = await prisma.user.update({
			where: { id },
			data: validation.data,
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

	return data;
};

const getOneById = async (id: string) => {
	const data = await prisma.user.findUnique({ where: { id } });

	if (!data) {
		throw ApiError.notFound.user({ id });
	}

	return data;
};

const userService = {
	createUser,
	updateUser,
	deleteUser,
	getMany,
	getOneById,
};

export default userService;
