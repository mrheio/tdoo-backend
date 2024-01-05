import { FastifyRequest } from 'fastify';
import z from 'zod';
import AuthSchema from './schemas/auth.schema';
import QuerySchema from './schemas/query.schema';
import TodoSchema from './schemas/todo.schema';
import UserSchemas from './schemas/user.schema';

export type SigninData = z.infer<typeof AuthSchema.signin>;
export type RegisterData = z.infer<typeof AuthSchema.register>;

export type User = z.infer<typeof UserSchemas.user>;
export type CreateUserData = z.infer<typeof UserSchemas.create>;
export type UpdateUserData = z.infer<typeof UserSchemas.update>;

export type Todo = z.infer<typeof TodoSchema.todo>;
export type CreateTodoData = z.infer<typeof TodoSchema.create>;
export type UpdateTodoData = z.infer<typeof TodoSchema.update>;

export type GetUsersQueryParams = z.infer<typeof QuerySchema.request.getUsers>;
export type GetUsersFilters = z.infer<typeof QuerySchema.filters.getUsers>;

export type GetTodosQueryParams = z.infer<typeof QuerySchema.request.getTodos>;
export type GetTodosFilters = z.infer<typeof QuerySchema.filters.getTodos>;

export type SignInRequest = FastifyRequest<{ Body: SigninData }>;
export type RegisterRequest = FastifyRequest<{ Body: RegisterData }>;

export type CreateTodoRequest = FastifyRequest<{ Body: CreateTodoData }>;
export type UpdateTodoRequest = FastifyRequest<{
	Params: { id: string };
	Body: UpdateTodoData;
}>;
export type DeleteTodoRequest = FastifyRequest<{ Params: { id: string } }>;
export type GetTodosRequest = FastifyRequest<{
	Querystring: GetTodosQueryParams;
}>;
export type GetTodoRequest = FastifyRequest<{ Params: { id: string } }>;

export type CreateUserRequest = FastifyRequest<{ Body: CreateUserData }>;
export type UpdateUserRequest = FastifyRequest<{
	Params: { id: string };
	Body: UpdateUserData;
}>;
export type DeleteUserRequest = FastifyRequest<{ Params: { id: string } }>;
export type GetUsersRequest = FastifyRequest<{
	Querystring: GetUsersQueryParams;
}>;
export type GetUserByIdRequest = FastifyRequest<{ Params: { id: string } }>;
