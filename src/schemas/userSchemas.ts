import z from 'zod';

const user = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	username: z.string(),
	created_at: z.date(),
	todos: z.array(z.any()).optional(),
});

const createUser = z.object({
	email: z.string().email(),
	username: z.string().min(3),
});

const updateUser = z.object({
	email: z.string().email().optional(),
	username: z.string().min(3).optional(),
});

const userSchemas = {
	user,
	createUser,
	updateUser,
};

export default userSchemas;
