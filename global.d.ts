declare global {
	namespace NodeJS {
		interface ProcessEnv {
			HOST: string;
			PORT: number;
			JWT_SECRET: string;
		}
	}
}
export {};
