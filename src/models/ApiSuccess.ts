import { FastifyReply } from 'fastify';
import { HttpStatusCode } from '../utils';

export default class ApiSuccess<T> {
	type: 'success' = 'success';
	statusCode: number = 200;
	data?: T;

	private constructor(statusCode: number, data?: T) {
		this.statusCode = statusCode;
		this.data = data;
	}

	static ok<T>(data: T) {
		return new ApiSuccess(HttpStatusCode.OK, data);
	}

	static created<T>(data: T) {
		return new ApiSuccess(HttpStatusCode.CREATED, data);
	}

	static noContent<T>() {
		return new ApiSuccess(HttpStatusCode.NO_CONTENT);
	}

	send(reply: FastifyReply) {
		if (this.statusCode === HttpStatusCode.NO_CONTENT) {
			return reply.code(this.statusCode).send();
		}
		return reply.code(this.statusCode).send(this);
	}
}
