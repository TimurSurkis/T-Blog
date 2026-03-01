import './AuthForms.css';

const UserInfo = ({ currentUser }) => {
	const { name, email, createdAt } = currentUser ?? {};

	let formattedDate;
	if (createdAt) {
		const date = new Date(createdAt);
		formattedDate = date.toLocaleDateString('ru-RU');
	}

	return (
		currentUser && (
			<div className="auth-container">
				<div className="user-info">
					<h2 className="user-info__title">Profile</h2>

					<div className="user-info__field">
						<span className="user-info__label">Name</span>
						<span className="user-info__value">{name}</span>
					</div>

					<div className="user-info__field">
						<span className="user-info__label">Email</span>
						<span className="user-info__value">{email}</span>
					</div>

					<div className="user-info__field">
						<span className="user-info__label">Created</span>
						<span className="user-info__value">
							{formattedDate}
						</span>
					</div>
				</div>
			</div>
		)
	);
};

export default UserInfo;
