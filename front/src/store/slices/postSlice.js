import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../util/errorHandler';

const API_URL = 'http://localhost:3001/api/post';

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async ({ cursor }, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`${API_URL}/fetchPosts?cursor=${cursor}`,
			);

			const result = await response.json();
			return result;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

export const fetchPostReactions = createAsyncThunk(
	'posts/fetchPostReactions',
	async (credentials, { rejectWithValue }) => {
		const { postId } = credentials;
		try {
			const response = await fetch(
				`${API_URL}/fetchPostReactions/${postId}`,
			);

			const result = await response.json();
			return result;
		} catch (err) {
			return rejectWithValue(handleError(err));
		}
	},
);

export const fetchPostComments = createAsyncThunk(
	'posts/fetchPostComments',
	async ({ postId, cursor }, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`${API_URL}/fetchPostComments/${postId}/comments?cursor=${cursor}`,
			);

			const result = await response.json();
			return result;
		} catch (err) {
			console.log(err);
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

export const setReaction = createAsyncThunk(
	'posts/setReaction',
	async (credentials, { rejectWithValue }) => {
		const { reactionType, postId } = credentials;
		try {
			const response = await fetch(
				`${API_URL}/setReaction/${reactionType}&${postId}`,
				{
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

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
	reactions: {},
	comments: [],
	loading: {
		fetchAll: true,
		fetchOne: true,
		create: false,
		setReaction: false,
	},

	nextPostsCursor: null,
	hasMorePosts: true,

	commentsStatus: 'idle',
	nextCommentsCursor: null,
	hasMoreComments: true,
	error: null,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,

	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		resetComments: (state) => {
			state.comments = [];
			state.commentsStatus = 'idle';
			state.nextCommentsCursor = null;
			state.hasMoreComments = true;
			state.error = null;
		},
	},

	extraReducers: (builder) => {
		builder
			// Create Post
			.addCase(createPost.pending, (state) => {
				state.loading.create = true;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.loading.create = false;
				postsSlice.caseReducers.clearError(state);
				state.items.push(action.payload.data);
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
				const { data, hasMore, nextCursor } = action.payload;

				const isFirstPage = action.meta.arg.cursor === null;

				state.items = isFirstPage ? data : [...state.items, ...data];
				state.hasMorePosts = hasMore;
				state.nextPostsCursor = nextCursor;
				state.loading.fetchAll = false;

				postsSlice.caseReducers.clearError(state);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading.fetchAll = false;
				state.error = action.payload;
			})

			// Fetch Post Reactions
			.addCase(fetchPostReactions.pending, (state) => {
				state.loading.fetchOne = true;
			})
			.addCase(fetchPostReactions.fulfilled, (state, action) => {
				state.loading.fetchOne = false;
				postsSlice.caseReducers.clearError(state);
				state.reactions = {
					...state.reactions,
					[action.payload.data.postId]:
						action.payload.data.postReactions,
				};
			})
			.addCase(fetchPostReactions.rejected, (state, action) => {
				state.loading.fetchOne = false;
				state.error = action.payload;
			})

			// Fetch Post Comments
			.addCase(fetchPostComments.pending, (state) => {
				state.commentsStatus = 'loading';
			})
			.addCase(fetchPostComments.fulfilled, (state, action) => {
				const { data, nextCursor, hasMore } = action.payload;

				const isFirstPage = action.meta.arg.cursor === null;
				state.comments = isFirstPage
					? data
					: [...state.comments, ...data];
				state.nextCommentsCursor = nextCursor;
				state.hasMoreComments = hasMore;
				state.commentsStatus = 'succeeded';
			})
			.addCase(fetchPostComments.rejected, (state, action) => {
				state.commentsStatus = 'error';
				state.error = action.payload;
			})

			// Set Reaction
			.addCase(setReaction.pending, (state) => {
				state.loading.setReaction = true;
			})
			.addCase(setReaction.fulfilled, (state, action) => {
				state.loading.setReaction = false;
				postsSlice.caseReducers.clearError(state);
				const post = state.items.find((item) => {
					return item.id === action.payload.data.postId;
				});
				post.hearts = action.payload.data.hearts;
				post.dislikes = action.payload.data.dislikes;

				state.reactions[action.payload.data.postId] =
					action.payload.data.reactions;
			})
			.addCase(setReaction.rejected, (state, action) => {
				state.loading.setReaction = false;
				state.error = action.payload;
			});
	},
});

export default postsSlice.reducer;

export const selectPostError = (state) => state.posts.error;
export const selectPosts = (state) => state.posts.items;
export const selectPostReactions = (state) => state.posts.reactions;
export const { resetComments } = postsSlice.actions;
