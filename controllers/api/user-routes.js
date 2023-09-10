// Create an Express router instance
const router = require("express").Router();

// Import the User model from the '../../models' directory
const { User } = require("../../models");

// Route: Create a new user
router.post("/", (req, res) => {
  // Create a new user in the database using data from the request body
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(dbUserData => {
    // Save user session data upon successful creation
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      // Respond with the user data in JSON format
      res.json(dbUserData);
    });
  })
  .catch(err => {
    // Handle errors with a 500 status and JSON response
    console.log(err);
    res.status(500).json(err);
  });
});

// Route: User login
router.post("/login", (req, res) => {
  // Find a user by their username in the database
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      // Respond with a 400 status and JSON message if no user is found
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    // Check if the provided password matches the user's stored password
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      // Respond with a 400 status and JSON message for an incorrect password
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // Save user session data upon successful login
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      // Respond with the user data and a success message in JSON format
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

// Route: User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the user's session and respond with a 204 status
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    // Respond with a 404 status if the user is not logged in
    res.status(404).end();
  }
});

// Route: Delete a user by ID
router.delete("/user/:id", (req, res) => {
  // Delete a user from the database by their ID
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      // Respond with a 404 status and JSON message if no user is found
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    // Respond with the deleted user data in JSON format
    res.json(dbUserData);
  })
  .catch(err => {
    // Handle errors with a 500 status and JSON response
    console.log(err);
    res.status(500).json(err);
  });
});

// Export the router for use in other parts of the application
module.exports = router;
