import { Outlet, Link } from 'react-router-dom';
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
				<Link to="/">
					<button className="btn__menu">Home</button>
				</Link>

				{currentUser ? (
					<Link to="/">
						<button onClick={handleLogout} className="btn__menu">
							Logout
						</button>
					</Link>
				) : (
					<div className="menu__right">
						<Link to="/login">
							<button className="btn__menu">Login</button>
						</Link>
						<Link to="/register">
							<button className="btn__menu">Register</button>
						</Link>
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
