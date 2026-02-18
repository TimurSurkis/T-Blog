import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3001/api/user';

export const fetchUser = createAsyncThunk(
	'users/getUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/getUser`);

			if (!response.ok) {
				const err = await response.json();
				return rejectWithValue(err.message || 'Loading error');
			}

			const data = await response.json();
			return data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	},
);

export const logoutUser = createAsyncThunk(
	'users/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/logout`);
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
			return rejectWithValue(err.message);
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
			});

			if (!response.ok) {
				const err = await response.json();
				return rejectWithValue(err.message);
			}

			const result = await response.json();
			console.log(result);
			return result;
		} catch (err) {
			return rejectWithValue(err.message);
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
			});

			if (!response.ok) {
				const err = await response.json();
				return rejectWithValue(err.message);
			}

			const result = await response.json();
			console.log(result);
			return result;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	},
);

const initialState = {
	items: [],
	currentUser: null,
	loading: {
		fetch: false,
		fetchOne: false,
		register: false,
		login: false,
		logout: false,
	},
	error: null,
};

const usersSlice = createSlice({
	name: 'posts',
	initialState,

	reducers: {
		clearCurrentUser: (state) => {
			state.currentUser = null;
		},
		clearError: (state) => {
			state.error = null;
		},
		setCurrentUser: (state, action) => {
			const user = state.items.find((item) => item.id === action.payload);
			if (user) {
				state.currentUser = user;
			}
		},
	},

	extraReducers: (builder) => {
		builder
			// Fetch User
			.addCase(fetchUser.pending, (state) => {
				state.loading.fetchOne = true;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading.fetchOne = false;
				state.currentUser = action.payload;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.loading.fetchOne = false;
				state.error = action.payload || 'Error loading user';
			})

			// Logout User
			.addCase(logoutUser.pending, (state) => {
				state.loading.logout = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.loading.logout = false;
				state.currentUser = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading.logout = false;
				state.error = action.payload.message;
			})

			// Login User
			.addCase(loginUser.pending, (state) => {
				state.loading.login = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading.login = false;
				state.currentUser = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading.login = false;
				state.error = action.payload.message;
				console.log(state.error);
			})

			// Register User
			.addCase(registerUser.pending, (state) => {
				state.loading.register = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading.register = false;
				state.currentUser = action.payload.user;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading.register = false;
				state.error = action.payload.message;
			});
	},
});

export const { clearCurrentUser, clearError, setCurrentUser } =
	usersSlice.actions;
export default usersSlice.reducer;
