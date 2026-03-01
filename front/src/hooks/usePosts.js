import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts } from '../store/slices/postSlice';

const usePosts = () => {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const createLoading = useSelector((state) => state.posts.loading.create);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch, createLoading]);

	return posts;
};

export default usePosts;
