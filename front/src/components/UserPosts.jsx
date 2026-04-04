import { NavLink } from 'react-router-dom';
import PostsContainer from './PostsContainer';
import filterPosts from '../store/util/filterPosts';

const UserPosts = ({ user, posts }) => {
	const userPosts = filterPosts(posts, 'userId', user.id, true);

	return userPosts.length > 0 ? (
		<PostsContainer currentUser={user} posts={userPosts} />
	) : (
		<div>
			<h3>No posts yet</h3>
			<NavLink to="/add-post">
				<button className="btn__add-post">Create first post</button>
			</NavLink>
		</div>
	);
};

export default UserPosts;
