import { buildServer } from './setup';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ?? 8080;

(async () => {
	const server = await buildServer();

	server.listen({ host, port }, (err, address) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}

		console.log(`Server listening at ${address}`);
	});
})();
