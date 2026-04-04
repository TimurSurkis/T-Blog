import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCurrentUser,
	selectUserLoading,
} from '../store/slices/userSlice';
import { fetchCurrentUser } from '../store/slices/userSlice';

function useCurrentUser() {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectUserLoading);

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	return { currentUser, isLoading };
}

export default useCurrentUser;
