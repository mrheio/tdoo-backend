import User from './User';

export default class Todo {
	id: number;
	task: string;
	done: boolean;
	created_at: Date;
	user_id: string;
	user?: typeof User;

	constructor(
		id: number,
		task: string,
		done: boolean,
		created_at: Date,
		user_id: string,
		user?: typeof User,
	) {
		this.id = id;
		this.task = task;
		this.done = done;
		this.created_at = created_at;
		this.user_id = user_id;
		this.user = user;
	}
}
