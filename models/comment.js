const { Model, Datatypes } = require('sequelize');
const sequelize = require('..config/connection.js');

class Comment extends Model { }

Comment.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      modelName: 'comment'
    }
)

module.exports = Comment;