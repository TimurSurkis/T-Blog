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
		allowNull: false,
	},
	hearts: {
		type: INTEGER,
		defaultValue: 0,
	},
	dislikes: {
		type: INTEGER,
		defaultValue: 0,
	},
	comments: {
		type: INTEGER,
		defaultValue: 0,
	},
});

export default Post;
