import { Navigate, BrowserRouter, Routes, Route } from 'react-router';
import './App.css';

import Menu from './components/Menu';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';

import { useCurrentUser } from './hooks/useCurrentUser';

function App() {
	const currentUser = useCurrentUser();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Menu />}>
					<Route
						path="/user-info"
						element={
							currentUser ? (
								<UserInfo />
							) : (
								<Navigate to="/" replace />
							)
						}
					/>
					<Route
						path="/register"
						element={
							!currentUser ? (
								<RegisterForm />
							) : (
								<Navigate to="/" replace />
							)
						}
					/>
					<Route
						path="/login"
						element={
							!currentUser ? (
								<LoginForm />
							) : (
								<Navigate to="/" replace />
							)
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
