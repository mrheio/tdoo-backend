import z from 'zod';

const getUsersQuery = z.object({
	email: z.string().optional(),
	username: z.string().optional(),
	order_by: z.string().optional(),
	order_dir: z.enum(['asc', 'desc']).optional(),
});

const getTodosQuery = z.object({
	user_id: z.string().optional(),
});

const getUsersFilters = z.object({
	email: z.string().optional(),
	username: z.string().optional(),
	orderBy: z
		.object({
			created_at: z.enum(['asc', 'desc']).optional(),
		})
		.optional(),
});

const querySchemas = {
	getUsersQuery,
	getTodosQuery,
	getUsersFilters,
};

export default querySchemas;
