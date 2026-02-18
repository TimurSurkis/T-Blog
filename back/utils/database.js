import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('t-blog', 'root', 'Kiev2009!', {
	dialect: 'mysql',
	host: 'localhost',
});

export default sequelize;
