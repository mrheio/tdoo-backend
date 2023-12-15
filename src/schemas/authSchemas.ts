import z from 'zod';

const signIn = z.object({
	username: z.string(),
	password: z.string(),
});

const register = z.object({
	email: z.string(),
	username: z.string(),
	password: z.string(),
});

const authSchemas = {
	signIn,
	register,
};

export default authSchemas;
