import dotenv from 'dotenv';
dotenv.config({ path: './back/.env' });
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import generateToken from '../utils/generateToken.js';

const saltRounds = 10;

export const getCurrentUser = async (req, res, next) => {
	if (req.session.user) {
		res.json(req.session.user);
	} else {
		res.status(200).json(null);
	}
};

export const getUser = async (req, res, next) => {
	const userId = req.body.userId;

	try {
		const user = await User.findOne({ where: { id: userId } });
		res.json({ success: true, data: user });
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal server error. Try again later',
		});
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
		await sgMail.send({
			to: email,
			from: 'surkis.timur@gmail.com',
			subject: 'Registration succeeded',
			text: "You've successfuly created your T-Blog account",
		});
		req.session.save((err) => {
			if (err) console.log(err);
			res.json({ success: true, user: newUser });
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error. Try again later',
		});
	}
};

export const postLogin = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	const wrongMessage = 'Wrong username or password';

	try {
		const user = await User.findOne({ where: { name: username } });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: wrongMessage,
				formData: {
					username,
					password,
				},
			});
		}
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({
				success: false,
				message: wrongMessage,
				formData: {
					username,
					password,
				},
			});
		}
		req.session.user = user;
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
			message: 'Internal server error. Try again later',
		});
	}
};

export const postSendReset = async (req, res, next) => {
	const email = req.body.email;

	try {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'No user found',
			});
		}

		const token = generateToken();
		await user.update({
			resetToken: token,
			resetTokenExpiration: Date.now() + 1000 * 60 * 5,
		});
		sgMail.send({
			to: email,
			from: 'surkis.timur@gmail.com',
			subject: 'Reset password',
			html: `<h2>Follow this <a href="http://localhost:5173/reset-password/${token}">link</a> to reset your password</h2>`,
		});
		res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error. Try again later',
		});
	}
};

export const postResetPassword = async (req, res, next) => {
	const token = req.body.token;
	const newPassword = req.body.newPassword;
	console.log(newPassword);

	try {
		const user = await User.findOne({
			where: {
				resetToken: token,
				resetTokenExpiration: { [Op.gt]: Date.now() },
			},
		});
		if (!user)
			res.status(400).json({
				success: false,
				message: 'Your time has expired. Send email again',
			});

		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		await user.update({
			password: hashedPassword,
			resetToken: null,
			resetTokenExpiration: null,
		});
		res.status(200).json({
			success: true,
			message: 'Password has been successfully changed. Login now',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error. Try again later',
		});
	}
};
