import userSchemas from '../schemas/userSchemas';
import Todo from './Todo';

export default class User {
	id: string;
	email: string;
	username: string;
	created_at: Date;
	todos: (typeof Todo)[] = [];

	constructor(
		id: string,
		email: string,
		username: string,
		created_at: Date,
		todos: (typeof Todo)[] = [],
	) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.created_at = created_at;
		this.todos = todos;
	}

	static validate = {
		create: (data: unknown) => userSchemas.createUser.safeParse(data),
		update: (data: unknown) => userSchemas.updateUser.safeParse(data),
	};
}
