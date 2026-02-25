import Express from 'express';
import {
	getUser,
	getLogout,
	postRegister,
	postLogin,
} from '../controllers/users.js';

const router = Express.Router();

router.get('/getUser', getUser);

router.get('/logout', getLogout);

router.post('/register', postRegister);

router.post('/login', postLogin);

export default router;
