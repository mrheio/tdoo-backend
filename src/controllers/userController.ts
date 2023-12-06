import { RouteHandler } from 'fastify';

const getUsers: RouteHandler = (request, reply) => {
	return { data: [] };
};

const userController = { getUsers };

export default userController;
