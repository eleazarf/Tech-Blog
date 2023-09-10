// Create an Express router instance
const router = require("express").Router();

// Import Post, Comment, and User models from '../../models/'
const { Post, Comment, User } = require("../../models/");

// Import the 'withAuth' middleware for authentication
const withAuth = require("../../utils/auth");

// Route: Create a new post
router.post("/", withAuth, (req, res) => {
  // Extract the request body and log the user's session ID
  const body = req.body;
  console.log(req.session.userId);

  // Create a new post in the database with the current user's ID
  Post.create({ ...body, userId: req.session.userId })
    .then(newPost => {
      // Respond with the newly created post in JSON format
      res.json(newPost);
    })
    .catch(err => {
      // Handle errors with a 500 status and JSON response
      res.status(500).json(err);
    });
});

// Route: Update a post by ID
router.put("/:id", withAuth, (req, res) => {
  // Log the request body and post ID
  console.log(req.body, req.params.id);

  // Update a post in the database based on the provided ID
  Post.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        // Respond with a 200 status if the update is successful
        res.status(200).end();
      } else {
        // Respond with a 404 status if no rows were affected (post not found)
        res.status(404).end();
      }
    })
    .catch(err => {
      // Handle errors with a 500 status and JSON response
      res.status(500).json(err);
    });
});

// Route: Delete a post by ID
router.delete("/:id", withAuth, (req, res) => {
  // Log the request body and post ID
  console.log(req.body, req.params.id);

  // Delete a post from the database based on the provided ID
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        // Respond with a 200 status if the deletion is successful
        res.status(200).end();
      } else {
        // Respond with a 404 status if no rows were affected (post not found)
        res.status(404).end();
      }
    })
    .catch(err => {
      // Handle errors with a 500 status and JSON response
      res.status(500).json(err);
    });
});

// Export the router for use in other parts of the application
module.exports = router;
