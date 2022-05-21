const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data/database');

class Author extends Model {};

Author.init(
    {
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'author',
        timestamps: false
    }
)

module.exports = Author;