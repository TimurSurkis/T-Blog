import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('users_practice', 'root', 'Kiev2009!', {
	dialect: 'mysql',
	host: 'localhost',
});

export default sequelize;
