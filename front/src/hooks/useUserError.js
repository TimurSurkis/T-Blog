import { useSelector } from 'react-redux';
import { selectError } from '../store/slices/userSlice';

export const useError = () => {
	const error = useSelector(selectError);

	return error;
};
