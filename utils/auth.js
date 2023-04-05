const withAuth = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;

/* This function will...
  - It checks if the userId is set in the req.session object.
  - If not (this means the user is not authenticated)...
    - The user will get redirected to the login page.
  - If it is set, the next() method will be called.
    - next() is important because as a request is made, it will
    go through middleware functions to change the req or res objects.
    - It says "hey I have done what I am supposed to do, lets move forward"
    - It will then move on to the next middleware function.
*/