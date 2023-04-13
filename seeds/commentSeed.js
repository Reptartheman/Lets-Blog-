const { Comment } = require('../models');

const commentData = [
    {

    },
    {

    }
]

const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData();