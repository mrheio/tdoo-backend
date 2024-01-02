const capitalize = (str: string) =>
	`${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

export const schemaMessages = {
	required: (field: string) => `${capitalize(field)} is required`,
	notEmpty: (field: string) => `You must enter a ${field}`,
	valid: (field: string) => `You must enter a valid ${field}`,
	notLongEnough: (field: string, length: number) =>
		`${capitalize(field)} should have at least ${length} characters`,
};
