import { buildServer } from './setup';

(async () => {
	const server = await buildServer();

	server.listen(
		{ host: process.env.HOST, port: process.env.PORT },
		(err, address) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}

			console.log(`Server listening at ${address}`);
		},
	);
})();
