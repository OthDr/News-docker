const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data/database');
const Author = require('./author');

class Article extends Model {};

Article.init(
    {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        urlToImage: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'article',
        timestamps: true
    }
);


Author.hasMany(Article,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Article.belongsTo(Author);


module.exports = Article;