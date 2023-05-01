const { Comment } = require('../models');

const commentData = [
    {
     content: 'good job',
     user_id: 2,
     post_id: 1
    },
    {
      content: 'hello spongebob',
      user_id: 1,
      post_id: 2
    }
  ]

const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData();