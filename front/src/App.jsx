import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';

import Menu from './components/Menu';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Menu />}></Route>
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
