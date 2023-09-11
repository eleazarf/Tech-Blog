// Import necessary modules from Sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');

// Import the Sequelize connection
const sequelize = require('../config/connection');

// Define the Comment model as a subclass of Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model with its attributes and configuration
Comment.init(
  {
    body: {
      type: DataTypes.STRING, // Define the 'body' attribute as a string
      allowNull: false        // Ensure the 'body' attribute is not nullable
    }
  },
  {
    sequelize // Link the model to the Sequelize connection
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
