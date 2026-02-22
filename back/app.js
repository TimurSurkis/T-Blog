import Express from 'express';
import sequelize from './utils/database.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const MySqlStoreFactory = require('express-mysql-session');

const MySqlStore = MySqlStoreFactory(session);

import router from './routes/users.js';

import User from './models/user.js';

const app = Express();

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Kiev2009!',
	database: 't-blog',
};
const store = new MySqlStore(options);

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store,
	}),
);

app.use(async (req, res, next) => {
	if (!req.session.user) return next();

	try {
		req.user = await User.findByPk(req.session.user.id);
		next();
	} catch (err) {
		next(err);
	}
});

app.use('/api/user', router);

(async () => {
	try {
		await sequelize.sync();

		const PORT = 3001;
		app.listen(PORT, 'localhost', () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
})();
