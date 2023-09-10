// Create an Express router instance
const router = require("express").Router();

// Import the Comment model from '../../models/'
const { Comment } = require("../../models/");

// Import the 'withAuth' middleware for authentication
const withAuth = require("../../utils/auth");

// Route: Create a new comment
router.post("/", withAuth, (req, res) => {
  // Create a new comment in the database with the current user's ID
  Comment.create({ ...req.body, userId: req.session.userId })
    .then(newComment => {
      // Respond with the newly created comment in JSON format
      res.json(newComment);
    })
    .catch(err => {
      // Handle errors with a 500 status and JSON response
      res.status(500).json(err);
    });
});

// Export the router for use in other parts of the application
module.exports = router;
