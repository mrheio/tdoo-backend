import z from 'zod';

const orderDirSchema = z.enum(['asc', 'desc']);

const getUsersQuery = z.object({
	email: z.string().optional(),
	username: z.string().optional(),
	order_by: z.string().optional(),
	order_dir: orderDirSchema.optional(),
});

const getTodosQuery = z.object({
	user_id: z.string().optional(),
});

const getUsersFilters = z.object({
	email: z.string().optional(),
	username: z.string().optional(),
	orderBy: z
		.object({
			created_at: orderDirSchema.optional(),
		})
		.optional(),
});

const QuerySchema = {
	request: {
		getUsers: getUsersQuery,
		getTodos: getTodosQuery,
	},
	filters: {
		getUsers: getUsersFilters,
	},
};

export default QuerySchema;
