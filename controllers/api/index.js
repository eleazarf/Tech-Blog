// Create an Express router instance
const router = require('express').Router();

// Import user, post, and comment routes
const userRoutes = require('./user-routes.js'); // Import user-related routes
const postRoutes = require('./post-routes'); // Import post-related routes
const commentRoutes = require('./comment-routes'); // Import comment-related routes

// Define subroutes for user, post, and comment resources
router.use('/user', userRoutes); // Use userRoutes for '/user' subroutes
router.use('/post', postRoutes); // Use postRoutes for '/post' subroutes
router.use('/comment', commentRoutes); // Use commentRoutes for '/comment' subroutes

// Export the router for use in other parts of the application
module.exports = router;
