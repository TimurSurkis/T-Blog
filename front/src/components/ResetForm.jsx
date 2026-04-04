import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendResetPassword } from '../store/slices/userSlice';
import { useUserError } from '../hooks/useUserError';
import { useNavigate } from 'react-router-dom';

const ResetForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useUserError();
	const [email, setEmail] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await dispatch(sendResetPassword({ email })).unwrap();

		if (result.success) {
			navigate('/check-email');
		}
	};

	return (
		<div className="auth-container">
			<form onSubmit={handleSubmit} className="auth-form">
				<h2 className="auth-form__title">Reset password</h2>

				<div className="auth-form__group">
					<label htmlFor="email" className="auth-form__label">
						Enter your email
					</label>
					<input
						type="email"
						className="auth-form__input"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<button
					type="submit"
					disabled={email ? false : true}
					className="auth-form__button"
				>
					Send email
				</button>
				{error && <p className="auth-form__error">{error}</p>}
			</form>
		</div>
	);
};

export default ResetForm;
