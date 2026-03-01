import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectUserLoading } from '../store/slices/userSlice';
import { fetchUser } from '../store/slices/userSlice';

function useCurrentUser() {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectUserLoading);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return { currentUser, isLoading };
}

export default useCurrentUser;