import { NavLink } from 'react-router-dom';

export const AddPostBtn = () => {
	return (
		<NavLink to="/add-post">
			<button className="btn__add-post">+ Create Post</button>
		</NavLink>
	);
};
