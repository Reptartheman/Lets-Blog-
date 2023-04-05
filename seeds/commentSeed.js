const { Comment } = require('../models');

const commentData = [
    {
        title: 'Comment One',
        content: 'I am comment. Hear me comment',
        user_id: 1
    },
    {
        title: 'Comment two',
        content: 'I am also comment. Hear me comment',
        user_id: 2
    }
]

const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData();