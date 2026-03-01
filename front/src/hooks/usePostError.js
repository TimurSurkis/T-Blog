import { useSelector } from 'react-redux';
import { selectPostError } from '../store/slices/postSlice';

const usePostError = () => {
	const error = useSelector(selectPostError);

	return error;
};

export default usePostError;