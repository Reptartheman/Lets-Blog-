const { Post } = require('../models')

const postData = [
  
  {
    title: 'postnumber1',
    content: 'I am post 1',
    user_id: 1
  },
  {
    title: 'postnumber2',
    content: 'I am post 2',
    user_id: 2

  }
]

const seedPostData = () => Post.bulkCreate(postData);

module.exports = seedPostData;

