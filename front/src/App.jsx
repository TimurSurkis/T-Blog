import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';

import Menu from './components/Menu';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Menu />}>
				<Route path="/user-info" element={<UserInfo />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/login" element={<LoginForm />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
