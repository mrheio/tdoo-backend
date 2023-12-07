import z from 'zod';

const createUser = z.object({
	email: z.string().email(),
	username: z.string().min(3),
});

const updateUser = z.object({
	email: z.string().email().optional(),
	username: z.string().min(3).optional(),
});

const getUsersQuery = z
	.object({
		email: z.string(),
		username: z.string(),
		order_by: z.string(),
		order_dir: z.enum(['asc', 'desc']),
	})
	.partial()
	.refine((input) => (input.order_dir ? !!input.order_by : false));

const userSchemas = {
	createUser,
	updateUser,
	getUsersQuery,
};

export default userSchemas;
