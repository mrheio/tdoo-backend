import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const userBuilder = ({ id, email, username, password }) => {
	return {
		id,
		email,
		username,
		password,
	};
};

const todoBuilder = ({ task, completed, user_id }) => {
	return { task, completed, user_id };
};

const users = [
	userBuilder({
		id: uuidv4(),
		email: 'user1@email.com',
		username: 'username1',
		password: 'password1',
	}),
	userBuilder({
		id: uuidv4(),
		email: 'user2@email.com',
		username: 'username2',
		password: 'password2',
	}),
	userBuilder({
		id: uuidv4(),
		email: 'user3@email.com',
		username: 'username3',
		password: 'password3',
	}),
].map((user) => ({
	...user,
	password: bcrypt.hashSync(user.password, bcrypt.genSaltSync()),
}));

const todos = [
	todoBuilder({ task: 'Task 1', completed: false, user_id: users[0].id }),
	todoBuilder({ task: 'Task 2', completed: true, user_id: users[1].id }),
	todoBuilder({ task: 'Task 3', completed: true, user_id: users[0].id }),
	todoBuilder({ task: 'Task 4', completed: false, user_id: users[2].id }),
	todoBuilder({ task: 'Task 5', completed: false, user_id: users[1].id }),
	todoBuilder({ task: 'Task 6', completed: false, user_id: users[0].id }),
	todoBuilder({ task: 'Task 7', completed: true, user_id: users[0].id }),
	todoBuilder({ task: 'Task 8', completed: false, user_id: users[2].id }),
	todoBuilder({ task: 'Task 9', completed: false, user_id: users[2].id }),
	todoBuilder({ task: 'Task 10', completed: true, user_id: users[1].id }),
];

const main = async () => {
	try {
		console.log('Deleting old data...');
		await prisma.$transaction([
			prisma.todo.deleteMany(),
			prisma.user.deleteMany(),
		]);

		console.log('Inserting users...');
		await prisma.user.createMany({ data: users });

		console.log('Insertings todos...');
		await prisma.todo.createMany({ data: todos });

		console.log('Seed completed');

		await prisma.$disconnect();
	} catch (e) {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	}
};

main();
