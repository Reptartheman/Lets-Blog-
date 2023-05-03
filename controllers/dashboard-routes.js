const router = require("express").Router();

const { User, Post, Comment } = require("../models");

const withAuth = require("../utils/auth");

/* This GET request will give us our main dashboard.
   - Before it hits the callback function, it's going to hit the 
    - withAuth to check for user authentication.
   - We then are finding the User based on the session ID.
   - The attributes are removing the sensitive information from
    the user data. 
   - It's going to take all of the user data besides the password
   - plain: true...this means that a plain JS object is going to be
        returned. This will remove any sequelize specific metadata.
   - The res.render is giving us the dashboard page and the user object
    data gets displayed on the page.
    - The logged in data also gets passed to the view.*/
router.get("/", async (req, res) => {
  try {
    console.log(req.session);
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Below is a GET request for the /new endpoint.  
    - Before it hits the callback function, it's going to hit the 
    - withAuth to check for user authentication.
    - Upon user authentication, it will render the new post handlebar.

*/
router.get("/new", (req, res) => {
  res.render("new_post");
});

/* 

- This is a GET request for the /edit/:id endpoint. The route will be defined
by the specified id for the Post.
- It then looks up a post in a database using a unique ID number that is provided in the URL.

- It's going to include the associated models because of what we have
    in the second argument which is the include portion.

- if (!postData): Then we will check if the post was found in the database. If it wasn't found, it means the post doesn't exist. Send the error message.

- This line takes the information about the post from the database and puts it into a JS object. The plain: true option tells us to leave out the Sequelize metadata.

- The spread operator in the ...post is taking the properties of the object and and rendering it to the page.

 */
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    if (!postData) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = postData.get({ plain: true });

    res.render("edit_post", {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
