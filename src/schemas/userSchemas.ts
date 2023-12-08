import z from 'zod';

const createUser = z.object({
	email: z.string().email(),
	username: z.string().min(3),
});

const updateUser = z.object({
	email: z.string().email().optional(),
	username: z.string().min(3).optional(),
});

const userSchemas = {
	createUser,
	updateUser,
};

export default userSchemas;
