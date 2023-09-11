// Import User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between models
Post.belongsTo(User, {
  foreignKey: 'userId', // Define the foreign key for the association
  onDelete: 'CASCADE' // Define the behavior on user deletion (CASCADE)
});

Post.hasMany(Comment, {
  foreignKey: 'postId', // Define the foreign key for the association
  onDelete: 'CASCADE' // Define the behavior on post deletion (CASCADE)
});

Comment.belongsTo(User, {
  foreignKey: 'userId', // Define the foreign key for the association
  onDelete: 'CASCADE' // Define the behavior on user deletion (CASCADE)
});

// Export the User, Comment, and Post models and their associations
module.exports = {
  User,
  Comment,
  Post
};
