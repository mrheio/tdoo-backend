import z from 'zod';
import { emailSchema, passwordSchema, usernameSchema } from './base.schema';

const signin = z.object({
	username: usernameSchema,
	password: passwordSchema,
});

const register = z.object({
	email: emailSchema,
	username: usernameSchema,
	password: passwordSchema,
});

const AuthSchema = {
	signin,
	register,
};

export default AuthSchema;
