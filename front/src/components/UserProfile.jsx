import { useSearchParams } from 'react-router-dom';
import PostsContainer from './PostsContainer';
import useUser from '../hooks/useUser';
import formatDate from '../store/util/formatDate';
import './AuthForms.css';
import filterPosts from '../store/util/filterPosts';

const UserProfile = ({ posts, currentUser }) => {
	const [searchParams] = useSearchParams();
	const userId = searchParams.get('userId');
	const user = useUser(Number(userId));

	const userRegistered = user ? formatDate(user.createdAt) : 'Loading';

	const userPosts = filterPosts(posts, 'userId', Number(userId), true);

	return !user ? (
		<h2>Loading...</h2>
	) : (
		<div className="user-profile">
			<div className="user-profile__card">
				<div className="user-profile__avatar" aria-hidden="true">
					{user.name.charAt(0).toUpperCase()}
				</div>
				<h2 className="user-profile__name">{user.name}</h2>
				<span className="user-profile__date">since {userRegistered}</span>
				<div className="user-profile__stats">
					<div className="user-profile__stat">
						<span className="user-profile__stat-value">
							{userPosts.length}
						</span>
						<span className="user-profile__stat-label">posts</span>
					</div>
					{/* future: followers, bio, etc. */}
				</div>
			</div>

			<div className="user-profile__posts-section">
				<h3 className="user-profile__posts-heading">Posts</h3>
				<PostsContainer posts={userPosts} currentUser={currentUser} />
			</div>
		</div>
	);
};

export default UserProfile;
