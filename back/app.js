import Express from 'express';
import sequelize from './utils/database.js';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './routes/users.js';

import User from './models/user.js';

const app = Express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* let setUserOnStart = false;
app.use('/', async (req, res, next) => {
	if (!setUserOnStart) {
		try {
			const user = await User.findByPk(1);
			req.user = user;
			console.log(`The user is: ${req.user}`);
			setUserOnStart = true;
		} catch (err) {
			console.log(err);
		}
	}
	next();
}); */

app.use('/api/user', router);

(async () => {
	try {
		await sequelize.sync();

		const [user] = await User.findOrCreate({
			where: { id: 1 },
			defaults: {
				name: 'Sitpot',
				email: 'surkis.timur@gmail.com',
				password: 'Kiev2009!',
			},
		});

		const PORT = 3001;
		app.listen(PORT, 'localhost', () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
})();
