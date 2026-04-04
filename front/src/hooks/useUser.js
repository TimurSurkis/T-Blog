import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../store/slices/userSlice';
import { useEffect } from 'react';

const useUser = (userId) => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		dispatch(fetchUser({ userId }));
	}, [dispatch, userId]);

	return user;
};

export default useUser;
