const RegisterForm = () => {
	return (
		<form
			action="register/register-user"
			className="form__register"
			method="POST"
		>
			<label htmlFor="username">Username</label>
			<input type="username" name="username" />
			<label htmlFor="email">Email</label>
			<input type="email" name="email" />
			<label htmlFor="password">Password</label>
			<input type="password" name="password" />
			<label htmlFor="repeatPassword">Repeat password</label>
			<input type="password" name="repeatPassword" />
			<button type="submit">Register</button>
		</form>
	);
};

export default RegisterForm;
