import { Navigate, BrowserRouter, Routes, Route } from 'react-router';
import './App.css';

import Menu from './components/Menu';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import AddPostBtn from './components/AddPostButton';
import PostsContainer from './components/PostsContainer';
import ProfileInfo from './components/ProfileInfo';
import UserPosts from './components/UserPosts';
import { AddPostForm } from './components/AddPostForm';

import useCurrentUser from './hooks/useCurrentUser';
import usePosts from './hooks/usePosts';
import UserProfile from './components/UserProfile';
import ResetForm from './components/ResetForm';
import ResetPassword from './components/ResetPassword';
import CheckEmail from './components/CheckEmail';

function App() {
	const { currentUser, isLoading } = useCurrentUser();
	const posts = usePosts();

	return isLoading ? (
		<div className="loading-screen">
			<h2 className="loading-screen__text">Loading...</h2>
		</div>
	) : (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Menu currentUser={currentUser} />}>
						<Route
							path="/"
							element={
								<>
									{currentUser && <AddPostBtn />}
									<div className="auth-container">
										<PostsContainer
											posts={posts}
											currentUser={currentUser}
										/>
									</div>
								</>
							}
						/>
						<Route
							path="/user-info"
							element={
								currentUser ? (
									<>
										<UserInfo currentUser={currentUser} />
									</>
								) : (
									<Navigate to="/" replace />
								)
							}
						>
							<Route
								path="/user-info/profile"
								element={<ProfileInfo />}
							/>
							<Route
								path="/user-info/posts"
								element={
									<UserPosts
										user={currentUser}
										posts={posts}
									/>
								}
							/>
						</Route>
						<Route
							path="/register"
							element={
								!currentUser ? (
									<RegisterForm currentUser={currentUser} />
								) : (
									<Navigate to="/" replace />
								)
							}
						/>
						<Route
							path="/login"
							element={
								!currentUser ? (
									<LoginForm currentUser={currentUser} />
								) : (
									<Navigate to="/" replace />
								)
							}
						/>
						<Route
							path="/add-post"
							element={
								currentUser ? (
									<AddPostForm currentUser={currentUser} />
								) : (
									<Navigate to="/" replace />
								)
							}
						/>
						<Route
							path="/user-profile"
							element={
								<UserProfile
									posts={posts}
									currentUser={currentUser}
								/>
							}
						/>
						<Route
							path="/reset-password-form"
							element={<ResetForm />}
						/>
						<Route path="/check-email" element={<CheckEmail />} />
						<Route
							path="/reset-password/:token"
							element={<ResetPassword />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
