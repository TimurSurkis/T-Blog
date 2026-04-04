import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../store/slices/userSlice';
import { useUserError } from '../hooks/useUserError';

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useUserError();
	const { token } = useParams();
	const [password, setPassword] = useState({ pass: '', repeatPass: '' });
	const [success, setSuccess] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await dispatch(
			resetPassword({ token, newPassword: password.pass }),
		).unwrap();

		if (result.success) {
			setSuccess(result.message);
		}
	};

	return (
		<div className="auth-container">
			<form onSubmit={handleSubmit} className="auth-form">
				<h2 className="auth-form__title">Reset password</h2>

				<div className="auth-form__group">
					<label htmlFor="password" className="auth-form__label">
						Enter your password
					</label>
					<input
						type="password"
						className="auth-form__input"
						name="password"
						id="password"
						value={password.pass}
						onChange={(e) =>
							setPassword({ ...password, pass: e.target.value })
						}
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
						type="password"
						className="auth-form__input"
						name="repeatPassword"
						id="repeatPassword"
						value={password.repeatPass}
						onChange={(e) =>
							setPassword({
								...password,
								repeatPass: e.target.value,
							})
						}
					/>
				</div>

				<button
					type="submit"
					disabled={
						password.pass !== password.repeatPass ||
						Object.values(password).some((value) => value === '')
					}
					className="auth-form__button"
				>
					Update password
				</button>
				{password.pass !== password.repeatPass &&
					password.repeatPass.trim() !== '' && (
						<p className="auth-form__warning">
							Password don't match
						</p>
					)}
				{success && <p className="auth-form__success">{success}</p>}
				{error && <p className="auth-form__error">{error}</p>}
			</form>
		</div>
	);
};

export default ResetPassword;
