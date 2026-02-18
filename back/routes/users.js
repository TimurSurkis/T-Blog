import Express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const router = Express.Router();

router.get('/getUser', (req, res, next) => {
	if (req.user) {
		res.json(req.user);
	} else {
		res.json();
	}
});

router.get('/logout', (req, res, next) => {
	if (req.user) {
		req.user = null;
		res.json({ success: true });
	} else {
		res.json({ success: false, message: 'No user found' });
	}
});

router.post('/register', async (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await User.findOne({ where: { name: username } });
		if (user) {
			return res.json({ success: false, message: 'User already exists' });
		}

		const EncryptedPassword = await bcrypt.hash(password, saltRounds);

		const newUserData = {
			name: username,
			email,
			password: EncryptedPassword,
		};
		const newUser = await User.create(newUserData);
		req.user = newUser;
		res.json({ success: true, user: req.user });
	} catch (err) {
		console.log(err);
		res.json({ success: false, message: err });
	}
});

router.post('/login', async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		const user = await User.findOne({ where: { name: username } });
		if (!user) {
			res.json({ success: false, message: 'Wrong username!' });
		}
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			res.json({ success: false, message: 'Wrong password!' });
		}
		req.user = user;
		console.log('USER', req.user);
		res.json({
			success: true,
			message: 'Logged in user!',
			user: req.user,
		});
	} catch (err) {
		console.log(err);
		res.json({ success: false, error: err });
	}
});

export default router;
