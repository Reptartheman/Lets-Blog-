/* This file will setup the routes for our application */

// creates an instance of Router from the express module object
const router = require('express').Router();
// these routes will be defined in the home-route.js file. In this file we are importing them for use.
const homeRoutes = require('./home-routes.js');
// same as above, but this will be for the dashboard.
const dashboardRoutes = require('./dashboard-routes');
// this will import routes from the api folder within the controllers directory.
const apiRoutes = require('./api');


// This sets up a route for the home endpoint. Uses the homeRoutes file data when requested.
router.use('/', homeRoutes);
//same as above, but this will be for the dashboard.
router.use('/dashboard', dashboardRoutes);
//same as line 14, but this will be for the api.
router.use('/api', apiRoutes);

module.exports = router;
