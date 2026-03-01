import { INTEGER, STRING, TEXT } from 'sequelize';
import sequelize from '../utils/database.js';

const Post = sequelize.define('post', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: STRING,
		allowNull: false,
	},
	text: {
		type: TEXT,
		allowNull: false,
	},
	author: {
		type: STRING,
		allowNull: false
	}
});

export default Post;