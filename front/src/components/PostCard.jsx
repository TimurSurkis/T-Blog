import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import './AuthForms.css';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';

import { setReaction } from '../store/slices/postSlice';
import { useDispatch } from 'react-redux';
import usePostReactions from '../hooks/usePostReactions';
import { NavLink } from 'react-router-dom';

const PostCard = ({ post, currentUser }) => {
	const dispatch = useDispatch();
	const cleanPostText = DOMPurify.sanitize(post.text);
	const postReactions = usePostReactions(post.id);

	const date = new Date(post.createdAt);
	const formattedDate = date.toLocaleDateString('ru-RU');

	const handleSetReaction = (reactionType) => {
		const data = { reactionType, postId: post.id };
		dispatch(setReaction(data));
	};

	return (
		<div className="post-card">
			<div
				className={`post-card__content ${currentUser ? 'post-card__content_margin' : ''}`}
			>
				<div className="post-card__meta">
					<NavLink className="post-card__author-link"
						to={{
							pathname:
								currentUser && currentUser.id === post.userId
									? '/user-info'
									: '/user-profile',
							search: `?userId=${post.userId}`,
						}}
					>
						<span className="post-card__author">{post.author}</span>
					</NavLink>
					<span className="post-card__date">{formattedDate}</span>
				</div>
				<h2 className="post-card__title">{post.title}</h2>
				<div className="post-card__text">{parse(cleanPostText)}</div>
			</div>

			{currentUser && (
				<div className="post-card__actions">
					<button
						className="reaction-btn"
						onClick={() => handleSetReaction('heart')}
					>
						{postReactions.length > 0 ? (
							postReactions.find(
								(reaction) =>
									reaction.reactionType === 'heart' &&
									reaction.userId === currentUser.id,
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
						className="reaction-btn"
						onClick={() => handleSetReaction('dislike')}
					>
						{postReactions.length > 0 ? (
							postReactions.find(
								(reaction) =>
									reaction.reactionType === 'dislike' &&
									reaction.userId === currentUser.id,
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
			)}
		</div>
	);
};

export default PostCard;
