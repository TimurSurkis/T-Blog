import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchPosts } from '../store/slices/postSlice';
import { useInfiniteScroll } from './useInfiniteScroll';

const usePosts = () => {
	const dispatch = useDispatch();
	const {
		items: posts,
		hasMorePosts,
		nextPostsCursor,
	} = useSelector((state) => state.posts);
	const { fetchAll: postsLoading } = useSelector(
		(state) => state.posts.loading,
	);

	useEffect(() => {
		dispatch(fetchPosts({ cursor: null }));
	}, []);

	const loadMore = useCallback(() => {
		if (postsLoading || !hasMorePosts) return;

		dispatch(fetchPosts({ cursor: nextPostsCursor }));
	}, [posts, hasMorePosts, nextPostsCursor, postsLoading]);

	const sentinelRef = useInfiniteScroll(loadMore, hasMorePosts);

	return { posts, sentinelRef };
};

export default usePosts;
