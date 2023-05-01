const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

/* Because a User can HAVE MANY Posts we need to define a One-to-Many relationship
The Foreign Key, which is where the two tables connect, will be user_id */

User.hasMany(Post, {
    foreignKey: 'user_id',
    
  });


  /* Our Posts belong to the User and will connect at user_id
  This way, when a User is deleted, so are all of their posts. */

  Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

  /* A Post, can HAVE MANY comments. This is another One-To-Many relationship.
  These two tables will connect at the FK of postID
  When a post is deleted, so are all of the comments */

  Post.hasMany(Comment, {
    foreignKey: 'post_id',
    
  });

  /* A Comment is going to belong to a Post. These are going to connect at post_id.
  When a user is deleted, so are their posts */

  Comment.belongsTo(Post, {
    foreignKey: 'post_id',
  });

  User.hasMany(Comment, {
    foreignKey: 'user_id',
    
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

  module.exports = {
    User,
    Post,
    Comment
  };