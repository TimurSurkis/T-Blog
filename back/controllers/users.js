import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

const saltRounds = 10;

export const getUser = (req, res, next) => {
	if (req.session.user) {
		res.json(req.session.user);
	} else {
		res.json();
	}
};

export const getLogout = (req, res, next) => {
	if (req.session.user) {
		req.session.destroy((err) => {
			if (err) console.log(err);
			res.clearCookie('connect.sid');
			res.json({ success: true });
		});
	} else {
		res.status(401).json({ success: false, message: 'No user found' });
	}
};

export const postRegister = async (req, res, next) => {
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
		req.session.user = newUser;
		req.session.save((err) => {
			if (err) console.log(err);
			res.json({ success: true, user: newUser });
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export const postLogin = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		const user = await User.findOne({ where: { name: username } });
		if (!user) {
			return res.status(401).json({
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
		req.session.user = user;
		console.log('USER', req.session.user);
		req.session.save((err) => {
			if (err) console.log(err);
			res.json({
				success: true,
				user: req.session.user,
			});
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};
