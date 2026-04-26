import { INTEGER, STRING } from 'sequelize';
import sequelize from '../utils/database.js';

const PostComment = sequelize.define('postComment', {
	id: {
		type: INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	postId: {
		type: INTEGER,
		allowNull: false,
	},
	userId: {
		type: INTEGER,
		allowNull: false,
	},
	text: {
		type: STRING,
		allowNull: false,
	},
});

export default PostComment;
