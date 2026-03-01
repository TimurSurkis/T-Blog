import PostCard from './PostCard';
import './AuthForms.css';

const PostsContainer = ({ posts }) => {
	const reversedPosts = posts.toReversed();
	return (
		<div className="posts-container">
			{reversedPosts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
};

export default PostsContainer;
