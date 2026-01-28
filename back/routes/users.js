import Express from 'express';
import User from '../models/user.js';

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
		res.json({ success: false, error: 'No user found' });
	}
});

router.post('/login', async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		const user = await User.findOne({ where: { name: username } });
		if (!user) {
			res.json({ success: false, error: 'Wrong username!' });
		}
		if (password !== user.password) {
			res.json({ success: false, error: 'Wrong password!' });
		}
		req.user = user;
		res.json({
			success: true,
			message: 'Logged in user!',
			user: req.user,
		});
	} catch (err) {
		console.log(err);
		res.json({ success: false, error: 'Error while logging in' });
	}
});

export default router;
