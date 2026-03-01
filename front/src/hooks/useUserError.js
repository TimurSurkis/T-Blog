import { useSelector } from 'react-redux';
import { selectUserError } from '../store/slices/userSlice';

export const useUserError = () => {
	const error = useSelector(selectUserError);

	return error;
};
