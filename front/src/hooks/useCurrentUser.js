import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/userSlice';
import { fetchUser } from '../store/slices/userSlice';

export function useCurrentUser() {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);

	useEffect(() => {
		dispatch(fetchUser());
	}, []);

	return currentUser;
}
