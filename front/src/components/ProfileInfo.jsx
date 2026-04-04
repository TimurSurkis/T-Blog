import { useOutletContext } from 'react-router-dom';

const ProfileInfo = () => {
	const data = useOutletContext();

	return (
		<div className="profile-info">
			<h2 className="profile-info__title">Profile</h2>

			<div className="profile-info__field">
				<span className="profile-info__label">Name</span>
				<span className="profile-info__value">{data.name}</span>
			</div>

			<div className="profile-info__field">
				<span className="profile-info__label">Email</span>
				<span className="profile-info__value">{data.email}</span>
			</div>

			<div className="profile-info__field">
				<span className="profile-info__label">Created</span>
				<span className="profile-info__value">{data.date}</span>
			</div>
		</div>
	);
};

export default ProfileInfo;
