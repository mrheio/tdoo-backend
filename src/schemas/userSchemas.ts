import z from 'zod';

const createUser = z.object({
	email: z.string().email(),
	username: z.string().min(3),
});

const updateUser = z.object({
	email: z.string().email().optional(),
	username: z.string().min(3).optional(),
});

const getUsersFilters = z
	.object({
		email: z.string(),
		username: z.string(),
		orderBy: z
			.object({
				created_at: z.enum(['asc', 'desc']),
			})
			.partial(),
	})
	.partial();

const userSchemas = {
	createUser,
	updateUser,
	getUsersFilters,
};

export default userSchemas;
