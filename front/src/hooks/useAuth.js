import { useDispatch } from 'react-redux';
import { registerUser, loginUser, logoutUser } from '../store/slices/userSlice';

export function useAuth() {
	const dispatch = useDispatch();

	const login = async (data) => {
		return await dispatch(loginUser(data)).unwrap();
	};

	const register = async (data) => {
		return await dispatch(registerUser(data)).unwrap();
	};

	const logout = () => dispatch(logoutUser());

	return { login, register, logout };
}
