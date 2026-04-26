import PostCard from './PostCard';
import './AuthForms.css';
import usePostError from '../hooks/usePostError';

const PostsContainer = ({ posts, currentUser }) => {
	const reversedPosts = posts.toReversed();
	const error = usePostError();

	return (
		<div className="posts-container">
			{posts.length > 0 ? (
				reversedPosts.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						currentUser={currentUser}
					/>
				))
			) : (
				<h2 className="center">No Posts Yet</h2>
			)}
			{error && <p>{error}</p>}
		</div>
	);
};

export default PostsContainer;
