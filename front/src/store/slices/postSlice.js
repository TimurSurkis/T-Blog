import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../util/errorHandler';

const API_URL = 'http://localhost:3001/api/post';

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/fetchPosts`);

			if (!response.ok) {
				const err = await response.json();
				return rejectWithValue(err.message);
			}

			const data = await response.json();
			return data.posts;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

export const createPost = createAsyncThunk(
	'posts/createPost',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/createPost`, {
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

			const data = await response.json();
			return data;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

const initialState = {
	items: [],
	loading: {
		fetchAll: true,
		create: false,
	},
	error: null,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,

	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},

	extraReducers: (builder) => {
		builder
			// Create Post
			.addCase(createPost.pending, (state) => {
				state.loading.create = true;
			})
			.addCase(createPost.fulfilled, (state) => {
				state.loading.create = false;
				postsSlice.caseReducers.clearError(state);
			})
			.addCase(createPost.rejected, (state, action) => {
				state.loading.create = false;
				state.error = action.payload;
			})

			// Fetch Posts
			.addCase(fetchPosts.pending, (state) => {
				state.loading.fetchAll = true;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading.fetchAll = false;
				postsSlice.caseReducers.clearError(state);
				state.items = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading.fetchAll = false;
				state.error = action.payload;
			});
	},
});

export default postsSlice.reducer;

export const selectPostError = (state) => state.posts.error;
export const selectPosts = (state) => state.posts.items;
