import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForms.css';
import { useAuth } from '../hooks/useAuth';
import { useUserError } from '../hooks/useUserError';

const RegisterForm = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const error = useUserError();

	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});
	/* const [error, setError] = useState(''); */

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const result = await auth.register(formData);

			if (result.success) {
				navigate('/');
			} /* else {
				setError(result.message);
			} */
		} catch (err) {
			return console.log(err);
			/* setError(err); */
		}
	};

	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleRegister}>
				<h2 className="auth-form__title">Create Account</h2>

				<div className="auth-form__group">
					<label htmlFor="username" className="auth-form__label">
						Username
					</label>
					<input
						className="auth-form__input"
						type="text"
						name="username"
						id="username"
						onChange={(e) =>
							setFormData({
								...formData,
								username: e.target.value,
							})
						}
					/>
				</div>

				<div className="auth-form__group">
					<label htmlFor="email" className="auth-form__label">
						Email
					</label>
					<input
						className="auth-form__input"
						type="email"
						name="email"
						id="email"
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
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
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							setFormData({
								...formData,
								password: e.target.value,
							});
						}}
					/>
				</div>

				<div className="auth-form__group">
					<label
						htmlFor="repeatPassword"
						className="auth-form__label"
					>
						Repeat password
					</label>
					<input
						className="auth-form__input"
						type="password"
						name="repeatPassword"
						id="repeatPassword"
						value={repeatPassword}
						onChange={(e) => setRepeatPassword(e.target.value)}
					/>
				</div>

				<button
					type="submit"
					className="auth-form__button"
					disabled={
						password !== repeatPassword ||
						Object.values(formData).some((value) => value === '')
					}
				>
					Register
				</button>

				{password !== repeatPassword &&
					repeatPassword.trim() !== '' && (
						<p className="auth-form__warning">
							Passwords doesn't match!
						</p>
					)}
				{error && <p className="auth-form__error">{error}</p>}
			</form>
		</div>
	);
};

export default RegisterForm;
