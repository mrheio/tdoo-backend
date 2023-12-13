import z from 'zod';

const createTodo = z.object({
	task: z.string(),
	user_id: z.string().uuid(),
});

const updateTodo = z.object({
	task: z.string().optional(),
});

const todoSchemas = {
	createTodo,
	updateTodo,
};

export default todoSchemas;
