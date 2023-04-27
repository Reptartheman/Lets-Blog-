// this file will hold all of the GET requests for the homepage

// this Router method will allow us to handle HTTP requests.
const router = require("express").Router();
// destructuring our objects from the models
const { Post, Comment, User } = require("../models");

/* this route will GET all of the posts for the homepage
 it finds all of the posts that include the user
 this will render the all posts handlebar page 
 */
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", { 
    posts,
    loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* this route will GET a post by it's PK which is its ID

this GET request will take in 2 arguments
    1. PK value which is the ID from the parameter in the URL
    2. An object that specifies related models to be included in the query.

For the INCLUDE block...
  1. The include option has the User model and the Comment model
  2. User in this case is to include the related User to the post
  3. The comment will include the related Comment to the post
  4. Will also include each user for the related Comment
*/
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      console.log(postData);
      const post = postData.get({ plain: true });

      res.render("single-post", { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
/* 
The next block has a GET method for the login page.
IF the user is already logged in then redirect to the home page
req.session is used to store information about the current user's browser session.
*/
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});


/* 
GET request for the signup page
1. checks if the current user is logged in
2. If they are, redirect them to the home page
3. If not, redirect them to the signup page
*/
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });
  
  module.exports = router;