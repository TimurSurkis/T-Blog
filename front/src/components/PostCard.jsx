import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import './AuthForms.css';

const PostCard = ({ post }) => {
	const cleanPostText = DOMPurify.sanitize(post.text);

	const date = new Date(post.createdAt);
	const formattedDate = date.toLocaleDateString('ru-RU');

	return (
		<div className="post-card">
			<div className="post-card__meta">
				<span className="post-card__author">{post.author}</span>
				<span className="post-card__date">{formattedDate}</span>
			</div>
			<h2 className="post-card__title">{post.title}</h2>
			<div className="post-card__text">{parse(cleanPostText)}</div>
		</div>
	);
};

export default PostCard;
