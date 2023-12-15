import z from 'zod';
import authSchemas from './schemas/authSchemas';
import querySchemas from './schemas/querySchemas';
import todoSchemas from './schemas/todoSchemas';
import userSchemas from './schemas/userSchemas';

export type CreateUserData = z.infer<typeof userSchemas.createUser>;
export type UpdateUserData = z.infer<typeof userSchemas.updateUser>;
export type GetUsersQueryParams = z.infer<typeof querySchemas.getUsersQuery>;
export type GetUsersFilters = z.infer<typeof querySchemas.getUsersFilters>;

export type CreateTodoData = z.infer<typeof todoSchemas.createTodo>;
export type UpdateTodoData = z.infer<typeof todoSchemas.updateTodo>;
export type GetTodosQueryParams = z.infer<typeof querySchemas.getTodosQuery>;

export type SignInData = z.infer<typeof authSchemas.signIn>;
export type RegisterData = z.infer<typeof authSchemas.register>;
