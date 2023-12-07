import prisma from '../db';
import ApiError from '../models/ApiError';
import userSchemas from '../schemas/userSchemas';

const createUser = async (payload: unknown) => {
	const valid = userSchemas.createUser.safeParse(payload);

	if (!valid.success) {
		throw ApiError.badRequest('Invalid user data', valid.error.flatten());
	}

	try {
		const res = await prisma.user.create({ data: valid.data });
		return res;
	} catch (err) {
		throw ApiError.maybeFromPrisma(err);
	}
};

const updateUser = async (id: string, payload: unknown) => {
	const valid = userSchemas.updateUser.safeParse(payload);

	if (!valid.success) {
		throw ApiError.badRequest('Invalid user data', valid.error.flatten());
	}

	try {
		const res = await prisma.user.update({
			where: { id },
			data: valid.data,
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

const getMany = async () => {
	const data = await prisma.user.findMany();
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
