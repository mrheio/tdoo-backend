import z from 'zod';

const getUsersQuery = z
	.object({
		email: z.string(),
		username: z.string(),
		order_by: z.string(),
		order_dir: z.enum(['asc', 'desc']),
	})
	.partial()
	.refine((input) => (input.order_dir ? !!input.order_by : false));

const querySchemas = {
	getUsersQuery,
};

export default querySchemas;
