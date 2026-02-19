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
