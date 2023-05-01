require('dotenv').config();
const path = require('path');
const express = require('express');
/* The variable below has Express-Session. This allows us to store the session data on the server. 
Express-Session will create a new session to each user that visits the app.
The client is also given a session ID cookie that persists from request to request */
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
/* The line below is a constructor that will allow us to store the express-session data */
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const app = express();
const PORT = process.env.PORT || 3001;


/* Below is an object that has the configuration options for the session middleware
It specifies how the session should be stored and managed by the server. */
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Dont Tell Nobody',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
/* The line below passes into our express-session that our application will use */
  app.use(session(sess));
/* creates an instance of handlebars nad defines the helpers we will use. */
  

// The line below will parse the request body if it has JSON data. It will then make it available in the req.body property.
app.use(express.json());
/* The line below will parse the request body if it has URL-encoded data and makes it available in the req.body property */
app.use(express.urlencoded({ extended: true }));
/* The line below lets us use our controllers module that defines our routes for our app */
app.use(express.static(path.join(__dirname, 'public')));

/* app.engine: This method will register the express-handlebars template engine as the enginges for the files with the .handlebars extension */
app.engine('handlebars', hbs.engine);
/* app.set: This method will set the view engine property of the app to handlebars. This will then tell the express-handlebars engine to render the views */
app.set('view engine', 'handlebars');
//app.set('views', './views')

/* The line below will give us files from the public directory locatedi n the same directory as the script */
app.use(routes);

// force false: This method will only create tables that do not already exist
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
});