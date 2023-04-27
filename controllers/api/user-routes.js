const router = require('express').Router();
const { User } = require('../../models');


/* 
    This POST request will create a new user in the database.
    - .create() will create a new user.
    - req.session.save() will save the users session data into
    the server. 
    - .save() will is called on the req.session object and
    will make sure the session is saved before the res is sent
    to the user.
    - user_id and logged_in properties are set in the session 
    object to show that the user is logged in.

*/
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });


/* This POST request is using the /login endpoint and using an asynchronous function
to find some user data.
  - Using the findOne() method we are using a where clause to find the username in the
  req.body object.
  - If that username is not entered into the login correctly, we will get the client error.
  - It will also check for a valid password passing the req.body object as a parameter.
  - If that password is not correct, we will get the client error.
  - req.session.save() will save the session to the server.
  - then an error if something goes wrong.
*/
 router.post("/login", async (req, res) => {
    try {
      const userData = await User.findOne({ where: { name: req.body.name } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: "Incorrect username or password, please try again" });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: "Incorrect username or password, please try again" });
        return;
      }
  
      await req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
        console.log(req.session);
        res.json({ user: userData, message: "You are now logged in!" });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

/* 
   Logout and end the session ONLY if the user is logged in.
*/

  router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;