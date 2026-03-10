import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchPostReactions,
	fetchPosts,
	selectPostReactions,
	selectPosts,
} from '../store/slices/postSlice';

const usePosts = (postId) => {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return posts;
};

export default usePosts;
