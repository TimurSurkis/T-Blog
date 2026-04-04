import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../util/errorHandler';

const API_URL = 'http://localhost:3001/api/user';

export const fetchCurrentUser = createAsyncThunk(
	'users/getCurrentUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/getCurrentUser`, {
				credentials: 'include',
			});

			if (!response.ok) {
				const err = await response.json();
				return rejectWithValue(err.message || 'Loading error');
			}

			const data = await response.json();
			return data;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

export const fetchUser = createAsyncThunk(
	'users/getUser',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/getUser`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});

			const data = await response.json();
			return data;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

export const logoutUser = createAsyncThunk(
	'users/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/logout`, {
				credentials: 'include',
			});
			if (!response.ok) {
				const err = await response.json();
				return rejectWithValue(err.message || 'Loading error');
			}
			const result = await response.json();
			if (result.success) {
				console.log('Successfully logout');
			}
			return result;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

export const loginUser = createAsyncThunk(
	'users/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
				credentials: 'include',
			});

			if (!response.ok) {
				const err = await response.json();
				return rejectWithValue(err.message);
			}

			const result = await response.json();
			return result;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

export const registerUser = createAsyncThunk(
	'users/register',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
				credentials: 'include',
			});

			if (!response.ok) {
				const err = await response.json();
				return rejectWithValue(err.message);
			}

			const result = await response.json();
			return result;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

export const sendResetPassword = createAsyncThunk(
	'users/sendResetPassword',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/send-reset-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error.message);
			}

			const result = await response.json();
			return result;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

export const resetPassword = createAsyncThunk(
	'users/resetPassword',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/reset-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error.message);
			}

			const result = await response.json();
			return result;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

const initialState = {
	user: null,
	currentUser: null,
	loading: {
		fetch: false,
		fetchCurrent: true,
		fetchOne: false,
		register: false,
		login: false,
		logout: false,
		sendResetPassword: false,
		resetPassword: false,
	},
	error: null,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,

	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		clearCurrentUser: (state) => {
			state.currentUser = null;
		},
	},

	extraReducers: (builder) => {
		builder
			// Fetch Current User
			.addCase(fetchCurrentUser.pending, (state) => {
				state.loading.fetchCurrent = true;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.loading.fetchCurrent = false;
				usersSlice.caseReducers.clearError(state);
				state.currentUser = action.payload;
			})
			.addCase(fetchCurrentUser.rejected, (state, action) => {
				state.loading.fetchCurrent = false;
				state.error = action.payload;
			})

			// Fetch User
			.addCase(fetchUser.pending, (state) => {
				state.loading.fetchOne = true;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading.fetchOne = false;
				usersSlice.caseReducers.clearError(state);
				state.user = action.payload.data;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.loading.fetchOne = false;
				state.error = action.payload;
			})

			// Logout User
			.addCase(logoutUser.pending, (state) => {
				state.loading.logout = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading.logout = false;
				usersSlice.caseReducers.clearError(state);
				usersSlice.caseReducers.clearCurrentUser(state);
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading.logout = false;
				state.error = action.payload;
			})

			// Login User
			.addCase(loginUser.pending, (state) => {
				state.loading.login = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading.login = false;
				usersSlice.caseReducers.clearError(state);
				state.currentUser = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading.login = false;
				state.error = action.payload;
			})

			// Register User
			.addCase(registerUser.pending, (state) => {
				state.loading.register = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading.register = false;
				usersSlice.caseReducers.clearError(state);
				state.currentUser = action.payload.user;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading.register = false;
				state.error = action.payload;
			})

			// Send Reset Password
			.addCase(sendResetPassword.pending, (state) => {
				state.loading.sendResetPassword = true;
			})
			.addCase(sendResetPassword.fulfilled, (state) => {
				state.loading.sendResetPassword = false;
				usersSlice.caseReducers.clearError(state);
			})
			.addCase(sendResetPassword.rejected, (state, action) => {
				state.loading.sendResetPassword = false;
				state.error = action.payload;
			})

			// Reset Password
			.addCase(resetPassword.pending, (state) => {
				state.loading.resetPassword = true;
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.loading.resetPassword = false;
				usersSlice.caseReducers.clearError(state);
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.loading.resetPassword = false;
				state.error = action.payload;
			});
	},
});

export const { clearError } = usersSlice.actions;

export const selectCurrentUser = (state) => state.users.currentUser;
export const selectUserLoading = (state) => state.users.loading.fetchCurrent;
export const selectUserError = (state) => state.users.error;
export const selectUser = (state) => state.users.user;

export default usersSlice.reducer;
