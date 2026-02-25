import { Outlet, NavLink } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAuth } from '../hooks/useAuth';

const Menu = () => {
	const currentUser = useCurrentUser();
	const auth = useAuth();

	const { name } = currentUser ?? {};

	const handleLogout = () => {
		auth.logout();
	};

	return (
		<>
			<nav className="menu">
				<NavLink to="/" className="menu__link">
					Home
				</NavLink>

				{currentUser ? (
					<div>
						<button className="menu__link" onClick={handleLogout}>
							Logout
						</button>
						<NavLink to="/user-info" className="menu__link">
							{name}
						</NavLink>
					</div>
				) : (
					<div className="menu__right">
						<NavLink to="/login" className="menu__link">
							Login
						</NavLink>
						<NavLink
							to="/register"
							className="menu__link menu__link--accent"
						>
							Register
						</NavLink>
					</div>
				)}
			</nav>

			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Menu;
