import { Navigate, BrowserRouter, Routes, Route } from 'react-router';
import './App.css';

import Menu from './components/Menu';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import { AddPostForm } from './components/AddPostForm';

import { useCurrentUser } from './hooks/useCurrentUser';

function App() {
	const { currentUser, isLoading } = useCurrentUser();

	return isLoading ? (
		<div>
			<h2>Loading...</h2>
		</div>
	) : (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Menu currentUser={currentUser} />}
					>
						<Route
							path="/user-info"
							element={
								currentUser ? (
									<UserInfo currentUser={currentUser} />
								) : (
									<Navigate to="/" replace />
								)
							}
						/>
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
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
