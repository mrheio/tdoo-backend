import z from 'zod';
import querySchemas from './schemas/querySchemas';
import userSchemas from './schemas/userSchemas';

export type GetUsersQueryParams = z.infer<typeof querySchemas.getUsersQuery>;
export type GetUsersFilters = z.infer<typeof userSchemas.getUsersFilters>;

export type CreateUserData = z.infer<typeof userSchemas.createUser>;
export type UpdateUserData = z.infer<typeof userSchemas.updateUser>;
