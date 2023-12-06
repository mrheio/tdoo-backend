export default class ApiResponse<T> {
	type: 'success' | 'error';
	data: T;

	constructor(type: 'success' | 'error', data: T) {
		this.type = type;
		this.data = data;
	}
}
