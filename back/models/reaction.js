import { INTEGER, STRING } from 'sequelize';
import sequelize from '../utils/database.js';

const Reaction = sequelize.define('reaction', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
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
	reactionType: {
		type: STRING(10),
		allowNull: false,
	},
});

export default Reaction;
