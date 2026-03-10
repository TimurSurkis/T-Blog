import PostCard from './PostCard';
import './AuthForms.css';

const PostsContainer = ({ posts, currentUser }) => {
	const reversedPosts = posts.toReversed();
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
		</div>
	);
};

export default PostsContainer;
