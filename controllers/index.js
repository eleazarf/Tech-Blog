// Create an Express router instance
const router = require('express').Router();

// Import routes for the dashboard, home, and API
const dashboardRoutes = require('./dashboard-routes.js');
const homeRoutes = require('./home-routes');
const apiRoutes = require("./api")

// Define route handlers for different URL paths
router.use('/', homeRoutes); // Use homeRoutes for the root path '/'
router.use('/dashboard', dashboardRoutes); // Use dashboardRoutes for '/dashboard'
router.use('/api', apiRoutes); // Use apiRoutes for '/api'

// Export the router for use in the application
module.exports = router;
