// Define an asynchronous function to handle comment submission
const commentFormHandler = async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Retrieve the post ID and comment body from form inputs
    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
    // Check if the comment body is not empty
    if (body) {
      // Send a POST request to the '/api/comment' route with the comment data
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          body
        }),
        headers: {
          'Content-Type': 'application/json' // Set the request content type to JSON
        }
      });
  
      // Reload the current page to reflect the new comment
      document.location.reload();
    }
  };
  
  // Add an event listener to the comment form to trigger the commentFormHandler
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);
  