const Sequelize = require('sequelize');

const sequelize = new Sequelize("news-db",'user','password',{
    dialect: 'sqlite',
    host: './dev.sqlite'
});

module.exports = sequelize;