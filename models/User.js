// Import necessary modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

// Define the User model
class User extends Model {
  // Method to check if a provided password matches the user's hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its attributes and configuration
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4] // Password length validation
      }
    }
  },
  {
    hooks: {
      // Set up beforeCreate lifecycle "hook" functionality to hash the password
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      // Set up beforeUpdate lifecycle "hook" functionality to hash the password
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize, // Link to the Sequelize connection
    timestamps: false, // Disable timestamp fields (created_at, updated_at)
    freezeTableName: true, // Ensure that the table name matches the model name
    underscored: true, // Use snake_case for column names
    modelName: 'User' // Define the model name
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
