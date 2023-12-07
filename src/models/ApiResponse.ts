export default class ApiResponse<T> {
	type: 'success' | 'error';
	data: T;

	constructor(type: 'success' | 'error', data: T) {
		this.type = type;
		this.data = data;
	}

	static success<T>(data: T) {
		return new ApiResponse('success', data);
	}

	static error<T>(data: T) {
		return new ApiResponse('error', data);
	}
}
