import z from 'zod';

const createUser = z.object({
	email: z.string().email(),
	username: z.string(),
});

const updateUser = z.object({
	email: z.string().email().optional(),
	username: z.string().optional(),
});

const userSchemas = {
	createUser,
	updateUser,
};

export default userSchemas;
