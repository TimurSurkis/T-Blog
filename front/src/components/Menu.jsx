import { Outlet, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, logoutUser } from '../store/slices/userSlice';
import { useEffect } from 'react';

const Menu = () => {
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.users.currentUser);

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch, currentUser]);

	return (
		<>
			<nav className="menu">
				<NavLink to="/" className="menu__link">
					Home
				</NavLink>

				{currentUser ? (
					<NavLink to="/" className="menu__link" onClick={handleLogout}>
						Logout
					</NavLink>
				) : (
					<div className="menu__right">
						<NavLink to="/login" className="menu__link">
							Login
						</NavLink>
						<NavLink to="/register" className="menu__link menu__link--accent">
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
