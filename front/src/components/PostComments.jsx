import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostComments, resetComments } from '../store/slices/postSlice';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const Comments = ({ postId, postAuthor }) => {
	const dispatch = useDispatch();
	const {
		comments,
		nextCommentsCursor,
		hasMoreComments,
		commentsStatus,
		error,
	} = useSelector((state) => state.posts);

	useEffect(() => {
		dispatch(resetComments());
		dispatch(fetchPostComments({ postId, cursor: null }));
	}, [postId]);

	const loadMore = useCallback(() => {
		if (commentsStatus === 'loading' || !hasMoreComments) return;

		dispatch(fetchPostComments({ postId, cursor: nextCommentsCursor }), [
			commentsStatus,
			hasMoreComments,
			nextCommentsCursor,
			postId,
		]);
	}, [commentsStatus, hasMoreComments, nextCommentsCursor, postId]);

	const sentinelRef = useInfiniteScroll(loadMore, hasMoreComments);

	return (
		<div className='comment-container'>
			{comments.map((comment) => (
				<div className='comment-card'>
					<div className="comment-header">
						<h5 className="no-margin">{comment.user.name}</h5>
						{comment.user.name === postAuthor && (
							<>
								<p className='comment-header__author'> - </p>
								<p className="comment-header__author no-margin">
									Post Author
								</p>
							</>
						)}
					</div>
					<p className='post-card__text'>{comment.text}</p>
				</div>
			))}

			<div ref={sentinelRef} />

			{commentsStatus === 'loading' && <p>Loading more comments...</p>}
			{error && <p>{error}</p>}
		</div>
	);
};

export default Comments;
