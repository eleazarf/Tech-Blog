// Create an Express router instance
const router = require("express").Router();

// Import models for Post, Comment, and User from '../models'
const { Post, Comment, User } = require("../models");

// Route: Get all posts for the homepage
router.get("/", (req, res) => {
  // Retrieve all posts, including associated User data
  Post.findAll({
    include: [User],
  })
    .then((dbPostData) => {
      // Map the retrieved database post data to plain JavaScript objects
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      // Render the "all-posts" view with the posts data
      res.render("all-posts", { posts });
    })
    .catch((err) => {
      // Handle errors with a 500 status and JSON response
      res.status(500).json(err);
    });
});

// Route: Get a single post by ID
router.get("/post/:id", (req, res) => {
  // Find a post by its primary key (ID) and include associated User and Comment data
  Post.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        // If the post exists, convert it to a plain JavaScript object
        const post = dbPostData.get({ plain: true });

        // Render the "single-post" view with the post data
        res.render("single-post", { post });
      } else {
        // If the post doesn't exist, return a 404 response
        res.status(404).end();
      }
    })
    .catch((err) => {
      // Handle errors with a 500 status and JSON response
      res.status(500).json(err);
    });
});

// Route: Get the login page, redirect to homepage if user is already logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    // If the user is already logged in, redirect to the homepage
    res.redirect("/");
    return;
  }

  // Render the "login" view
  res.render("login");
});

// Route: Get the signup page, redirect to homepage if user is already logged in
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    // If the user is already logged in, redirect to the homepage
    res.redirect("/");
    return;
  }

  // Render the "signup" view
  res.render("signup");
});

// Export the router for use in other parts of the application
module.exports = router;
