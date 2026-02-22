import Express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

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
		res.status(401).json({ success: false, message: 'No user found' });
	}
});

router.post('/register', async (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await User.findOne({
			where: {
				[Op.or]: [{ name: username }, { email }],
			},
		});
		if (user) {
			return res.status(409).json({
				success: false,
				message:
					user.name === username
						? 'Username already in use'
						: 'Email already in use',
			});
		}

		const EncryptedPassword = await bcrypt.hash(password, saltRounds);

		const newUserData = {
			name: username,
			email,
			password: EncryptedPassword,
		};
		const newUser = await User.create(newUserData);
		req.user = newUser;
		res.json({ success: true, user: newUser });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
});

router.post('/login', async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		const user = await User.findOne({ where: { name: username } });
		if (!user) {
			res.status(401).json({
				success: false,
				message: 'Wrong username',
				formData: {
					username,
					password,
				},
			});
		}
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			res.status(401).json({
				success: false,
				message: 'Wrong password',
				formData: {
					username,
					password: '',
				},
			});
		}
		req.user = user;
		console.log('USER', req.user);
		res.json({
			success: true,
			user: req.user,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
});

export default router;
