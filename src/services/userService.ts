import prisma from '../db';
import userSchemas from '../schemas/userSchemas';

const createUser = async (payload: unknown) => {
	const data = userSchemas.createUser.parse(payload);

	const res = await prisma.user.create({ data });

	return res;
};

const updateUser = async (id: string, payload: unknown) => {
	const data = userSchemas.updateUser.parse(payload);

	const res = await prisma.user.update({ where: { id }, data });

	return res;
};

const deleteUser = async (id: string) => {
	const res = await prisma.user.delete({ where: { id } });

	return res;
};

const getMany = async () => {
	const data = await prisma.user.findMany();

	return data;
};

const getOneById = async (id: string) => {
	const data = await prisma.user.findUnique({ where: { id } });

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
