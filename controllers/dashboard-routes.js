// Create an Express router instance
const router = require("express").Router();

// Import the Post model for database interaction
const { Post } = require("../models");

// Import the 'withAuth' middleware for authentication
const withAuth = require("../utils/auth");

// Define a route to display all posts for the authenticated user
router.get("/", withAuth, (req, res) => {
  // Find all posts associated with the current user
  Post.findAll({
    where: {
      userId: req.session.userId // Filter by the user's ID from the session
    }
  })
    .then(dbPostData => {
      // Map the retrieved database post data to plain JavaScript objects
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      
      // Render the "all-posts-admin" view with layout "dashboard"
      res.render("all-posts-admin", {
        layout: "dashboard",
        posts // Pass the posts data to the view
      });
    })
    .catch(err => {
      // Handle errors by logging and redirecting to the login page
      console.log(err);
      res.redirect("login");
    });
});

// Define a route to render the "new-post" view for creating a new post
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard"
  });
});

// Define a route to render the "edit-post" view for editing an existing post
router.get("/edit/:id", withAuth, (req, res) => {
  // Find a post by its primary key (ID)
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      if (dbPostData) {
        // If the post exists, convert it to a plain JavaScript object
        const post = dbPostData.get({ plain: true });
        
        // Render the "edit-post" view with layout "dashboard"
        res.render("edit-post", {
          layout: "dashboard",
          post // Pass the post data to the view
        });
      } else {
        // If the post doesn't exist, return a 404 response
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
