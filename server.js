// Import necessary Node.js modules and libraries
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

// Create an instance of the Express application
const app = express();

// Define the port number for the server, using the provided port or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Import Sequelize and set up a connection to the database
const sequelize = require("./config/connection.js");

// Import the Sequelize session store to manage sessions in the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create a session configuration object
const sess = {
    secret: "1This.Is@Secr3t", // Secret used to sign the session ID
    cookie: {}, // Configuration for session cookies (can be customized)
    resave: false, // Whether to save the session data even if it wasn't modified
    saveUninitialized: true, // Whether to save new, but not modified, sessions
    store: new SequelizeStore({
      db: sequelize // Store session data in the Sequelize-managed database
    })
  };

 // Configure Express to use the session middleware with the provided session settings
app.use(session(sess));

// Create a Handlebars instance with a custom helper for formatting dates
const hbs = exphbs.create({
  helpers: {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }
});

// Set Handlebars as the templating engine for Express
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Include the routes and controllers from the './controllers/' directory
app.use(require('./controllers/'));

// Start the Express server, listen on the specified port, and synchronize with the database
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
}); 