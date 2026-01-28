import { INTEGER, STRING } from 'sequelize';
import sequelize from '../utils/database.js';

const User = sequelize.define('user', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: STRING,
		allowNull: false,
	},
	email: {
		type: STRING,
		allowNull: false,
	},
	password: {
		type: STRING,
		allowNull: false,
	},
});

export default User;
