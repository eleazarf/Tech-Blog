// Import necessary modules from Sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');

// Import the Sequelize connection
const sequelize = require('../config/connection.js');

// Define the Post model as a subclass of Sequelize's Model class
class Post extends Model {}

// Initialize the Post model with its attributes and configuration
Post.init(
  {
    title: DataTypes.STRING, // Define the 'title' attribute as a string
    body: DataTypes.STRING   // Define the 'body' attribute as a string
  },
  {
    sequelize // Link the model to the Sequelize connection
  }
);

// Export the Post model for use in other parts of the application
module.exports = Post;
