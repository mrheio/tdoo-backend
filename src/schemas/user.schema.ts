import z from 'zod';
import {
	createdAtSchema,
	emailSchema,
	passwordSchema,
	usernameSchema,
} from './base.schema';
import TodoSchema from './todo.schema';
import { schemaMessages } from './utils';

const idSchema = z
	.string({ required_error: schemaMessages.required('id') })
	.uuid({ message: schemaMessages.valid('id') });

const userSchema = z.object({
	id: idSchema,
	email: emailSchema,
	username: usernameSchema,
	created_at: createdAtSchema,
	todos: z.array(TodoSchema.todo).optional(),
});

const createUserSchema = z.object({
	email: emailSchema,
	username: usernameSchema,
	password: passwordSchema,
});

const updateUserSchema = z.object({
	email: emailSchema.optional(),
	username: usernameSchema.optional(),
});

const UserSchemas = {
	user: userSchema,
	create: createUserSchema,
	update: updateUserSchema,
};

export default UserSchemas;
