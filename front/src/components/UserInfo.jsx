import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import './AuthForms.css';
import formatDate from '../store/util/formatDate';

const UserInfo = ({ currentUser }) => {
	const { pathname } = useLocation();
	const { name, email, createdAt } = currentUser ?? {};

	let formattedDate;
	if (createdAt) {
		formattedDate = formatDate(createdAt);
	}
	const outletContext = { name, email, date: formattedDate };

	return (
		currentUser && (
			<>
				{pathname === '/user-info' && (
					<Navigate to="/user-info/profile" />
				)}
				<div className="user-info">
					<div className="sidebar">
						<ul className="account-infos">
							<li className="account-info">
								<NavLink
									to="/user-info/profile"
									className="account-info__btn"
								>
									Profile
								</NavLink>
							</li>
							<li className="account-info">
								<NavLink
									to="/user-info/posts"
									className="account-info__btn"
								>
									Posts
								</NavLink>
							</li>
						</ul>
					</div>
					<div className="auth-container">
						<Outlet context={outletContext} />
					</div>
				</div>
			</>
		)
	);
};

export default UserInfo;
