// Middleware function for authentication
const withAuth = (req, res, next) => {
    // Check if a user is authenticated (has a userId in the session)
    if (!req.session.userId) {
      // If not authenticated, redirect to the login page
      res.redirect("/login");
    } else {
      // If authenticated, continue to the next middleware or route handler
      next();
    }
  };
  
  // Export the withAuth middleware for use in route handlers
  module.exports = withAuth;
  