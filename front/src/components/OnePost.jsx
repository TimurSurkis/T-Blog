import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';

import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setReaction } from '../store/slices/postSlice';

import usePostReactions from '../hooks/usePostReactions';
import Comments from './PostComments';

const OnePost = ({ posts, currentUser }) => {
	const dispatch = useDispatch();
	const { postId } = useParams();
	const postIdNum = Number(postId);
	const onePost = posts.filter((post) => post.id === postIdNum);
	const post = onePost[0];

	const cleanPostText = DOMPurify.sanitize(post.text);
	const postReactions = usePostReactions(post.id);

	const date = new Date(post.createdAt);
	const formattedDate = date.toLocaleDateString('ru-RU');

	const handleSetReaction = (reactionType) => {
		const data = { reactionType, postId: post.id };
		dispatch(setReaction(data));
	};

	return (
		<div className="posts-container">
			<div className="post-card">
				<div
					className={`post-card__content ${currentUser ? 'post-card__content_margin' : ''}`}
				>
					<div className="post-card__meta">
						<Link
							className="post-card__author-link"
							to={{
								pathname:
									currentUser &&
									currentUser.id === post.userId
										? '/user-info'
										: `/user-profile/${post.userId}`,
							}}
						>
							<span className="post-card__author">
								{post.author}
							</span>
						</Link>
						<span className="post-card__date">{formattedDate}</span>
					</div>
					<h2 className="post-card__title">{post.title}</h2>
					<div className="post-card__text">
						{parse(cleanPostText)}
					</div>
				</div>

				{currentUser && (
					<>
						<div className="post-card__actions">
							<div className="post-card__reactions">
								<button
									className="action-btn"
									onClick={() => handleSetReaction('heart')}
								>
									{postReactions.length > 0 ? (
										postReactions.find(
											(reaction) =>
												reaction.reactionType ===
													'heart' &&
												reaction.userId ===
													currentUser.id,
										) ? (
											<AiFillHeart />
										) : (
											<AiOutlineHeart />
										)
									) : (
										<AiOutlineHeart />
									)}
								</button>
								<p>{post.hearts}</p>
								<button
									className="action-btn"
									onClick={() => handleSetReaction('dislike')}
								>
									{postReactions.length > 0 ? (
										postReactions.find(
											(reaction) =>
												reaction.reactionType ===
													'dislike' &&
												reaction.userId ===
													currentUser.id,
										) ? (
											<AiFillDislike />
										) : (
											<AiOutlineDislike />
										)
									) : (
										<AiOutlineDislike />
									)}
								</button>
								<p>{post.dislikes}</p>
							</div>

							<Link className="action-btn" to={`/`}>
								<AiOutlineComment />
							</Link>
							<p>{post.comments}</p>
						</div>
						<Comments postId={post.id} postAuthor={post.author} />
					</>
				)}
			</div>
		</div>
	);
};

export default OnePost;
