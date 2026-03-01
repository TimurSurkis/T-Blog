import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectLoading } from '../store/slices/userSlice';
import { fetchUser } from '../store/slices/userSlice';

export function useCurrentUser() {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectLoading);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return { currentUser, isLoading };
}
