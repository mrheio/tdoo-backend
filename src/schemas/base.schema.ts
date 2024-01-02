import z from 'zod';
import { schemaMessages } from './utils';

export const usernameSchema = z
	.string({ required_error: schemaMessages.required('username') })
	.min(1, { message: schemaMessages.notEmpty('username') })
	.min(3, { message: schemaMessages.notLongEnough('username', 3) });

export const passwordSchema = z
	.string({ required_error: schemaMessages.required('password') })
	.min(1, { message: schemaMessages.notEmpty('password') })
	.min(8, { message: schemaMessages.notLongEnough('password', 8) });

export const emailSchema = z
	.string({ required_error: schemaMessages.required('email') })
	.email({ message: schemaMessages.valid('email') });

export const createdAtSchema = z.date({
	required_error: schemaMessages.required('created_at'),
	invalid_type_error: schemaMessages.valid('created_at'),
});
