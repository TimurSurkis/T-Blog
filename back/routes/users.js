import Express from 'express';
import {
	getCurrentUser,
	getLogout,
	postRegister,
	postLogin,
	getUser,
	postSendReset,
	postResetPassword,
} from '../controllers/users.js';

const router = Express.Router();

router.get('/getCurrentUser', getCurrentUser);

router.post('/getUser', getUser);

router.get('/logout', getLogout);

router.post('/register', postRegister);

router.post('/login', postLogin);

router.post('/send-reset-password', postSendReset);

router.post('/reset-password', postResetPassword);

export default router;
