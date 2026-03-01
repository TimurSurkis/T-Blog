import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForms.css';
import { useAuth } from '../hooks/useAuth';
import { useError } from '../hooks/useUserError';

const LoginForm = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const error = useError();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	/* const [error, setError] = useState(''); */

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const result = await auth.login(formData);

			if (result.success) {
				navigate('/');
			} else {
				/* setError(result.message); */
				setFormData(result.formData);
			}
		} catch (err) {
			console.error(`Login failed: ${err}`);
			/* setError(err); */
		}
	};

	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleLogin}>
				<h2 className="auth-form__title">Login</h2>

				<div className="auth-form__group">
					<label htmlFor="username" className="auth-form__label">
						Username
					</label>
					<input
						className="auth-form__input"
						type="text"
						name="username"
						id="username"
						value={formData.username}
						onChange={(e) =>
							setFormData({
								...formData,
								username: e.target.value,
							})
						}
					/>
				</div>

				<div className="auth-form__group">
					<label htmlFor="password" className="auth-form__label">
						Password
					</label>
					<input
						className="auth-form__input"
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={(e) =>
							setFormData({
								...formData,
								password: e.target.value,
							})
						}
					/>
				</div>

				<button
					disabled={
						Object.values(formData).some((value) => value === '') &&
						true
					}
					type="submit"
					className="auth-form__button"
				>
					Login
				</button>

				{error && <p className="auth-form__error">{error}</p>}
			</form>
		</div>
	);
};

export default LoginForm;
