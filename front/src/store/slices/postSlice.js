import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../util/errorHandler';

const API_URL = 'http://localhost:3001/api/post';

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
		create: false,
	},
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,

	extraReducers: (builder) => {
		builder
			// Create Post
			.addCase(createPost.pending, (state) => {
				state.loading = true;
			})
			.addCase(createPost.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(createPost.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default postsSlice.reducer;
