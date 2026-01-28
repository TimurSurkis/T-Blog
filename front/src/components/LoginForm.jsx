import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [error, setError] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const result = await dispatch(loginUser(formData)).unwrap();

			if (result.success) {
				navigate('/');
			} else {
				setError(result.error);
			}
		} catch (err) {
			console.error(`Login failed: ${err}`);
		}
	};

	return (
		<form
			action="/login"
			className="form__register"
			method="POST"
			onSubmit={handleLogin}
		>
			<label htmlFor="username">Username</label>
			<input
				type="username"
				name="username"
				value={formData.username}
				onChange={(e) => {
					setFormData({ ...formData, username: e.target.value });
				}}
			/>
			<label htmlFor="password">Password</label>
			<input
				type="password"
				name="password"
				value={formData.password}
				onChange={(e) => {
					setFormData({ ...formData, password: e.target.value });
				}}
			/>
			<button type="submit">Login</button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default LoginForm;
