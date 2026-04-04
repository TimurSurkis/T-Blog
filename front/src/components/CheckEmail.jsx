import './AuthForms.css';

const CheckEmail = () => {
	return (
		<div className="auth-container">
			<div className="auth-form">
				<p className="auth-form__icon">📧</p>
				<h2 className="auth-form__title">Check your email</h2>
				<p className="auth-form__subtitle">
					We sent you a password reset link
				</p>
			</div>
		</div>
	);
};

export default CheckEmail;
