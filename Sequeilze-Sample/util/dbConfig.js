const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodesample','root','Windows.2000',{dialect : 'mysql' , host: 'localhost'});

module.exports = sequelize;