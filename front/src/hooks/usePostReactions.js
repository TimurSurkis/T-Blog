import { useDispatch, useSelector } from 'react-redux';
import {
	fetchPostReactions,
	selectPostReactions,
} from '../store/slices/postSlice';
import { useEffect } from 'react';

const usePostReactions = (postId) => {
	const dispatch = useDispatch();
	const postReactions = useSelector((state) => state.posts.reactions);

	useEffect(() => {
		dispatch(fetchPostReactions({ postId }));
	}, []);

	return postReactions[`${postId}`] ?? [];
};

export default usePostReactions;
