import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../util/errorHandler';

const API_URL = 'http://localhost:3001/api/user';

export const fetchUser = createAsyncThunk(
	'users/getUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/getUser`, {
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
			console.log(result);
			return result;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

const initialState = {
	items: [],
	currentUser: null,
	loading: {
		fetch: false,
		fetchOne: true,
		register: false,
		login: false,
		logout: false,
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
			// Fetch User
			.addCase(fetchUser.pending, (state) => {
				state.loading.fetchOne = true;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading.fetchOne = false;
				usersSlice.caseReducers.clearError(state);
				state.currentUser = action.payload;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.loading.fetchOne = false;
				state.error = action.payload;
			})

			// Logout User
			.addCase(logoutUser.pending, (state) => {
				state.loading.logout = true;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
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
			});
	},
});

export const { clearError } = usersSlice.actions;

export const selectCurrentUser = (state) => state.users.currentUser;
export const selectLoading = (state) => state.users.loading.fetchOne;
export const selectError = (state) => state.users.error;

export default usersSlice.reducer;
