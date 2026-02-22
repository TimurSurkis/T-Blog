export const handleError = (error) => {
	console.log(`Error caught in thunk: ${error}`);

	if (error instanceof Error) {
		if (error.name === 'TypeError') {
			return 'Network error. Please try again later.';
		}
		if (error.name === 'SyntaxError') {
			return 'Server error. Please try again later.';
		}

		return error.message;
	}

	return 'An unexpected error occurred';
};
