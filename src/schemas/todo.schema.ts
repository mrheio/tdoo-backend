import z from 'zod';
import { createdAtSchema } from './base.schema';
import { schemaMessages } from './utils';

const idSchema = z.number({
	required_error: schemaMessages.required('id'),
	invalid_type_error: schemaMessages.valid('id'),
});

const taskSchema = z
	.string({ required_error: schemaMessages.required('task') })
	.min(1, { message: schemaMessages.notEmpty('task') });

const completedSchema = z.boolean({
	required_error: schemaMessages.required('completed'),
	invalid_type_error: schemaMessages.valid('completed'),
});

const userIdSchema = z
	.string({ required_error: schemaMessages.required('user_id') })
	.uuid({ message: schemaMessages.valid('user_id') });

const todoSchema = z.object({
	id: idSchema,
	task: taskSchema,
	completed: completedSchema,
	created_at: createdAtSchema,
	user_id: userIdSchema,
});

const createTodoSchema = z.object({
	task: taskSchema,
	completed: completedSchema.optional(),
	user_id: userIdSchema,
});

const updateTodoSchema = z.object({
	task: taskSchema.optional(),
	completed: completedSchema.optional(),
});

const TodoSchema = {
	todo: todoSchema,
	create: createTodoSchema,
	update: updateTodoSchema,
};

export default TodoSchema;
