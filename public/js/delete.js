// Define an asynchronous function to handle post deletion
const deletePostHandler = async function(event) {
    console.log("clicked", event); // Log a message to the console for debugging
    event.preventDefault(); // Prevent the default link behavior

    // Retrieve the post ID from the 'post-id' element
    const postId = document.getElementById('post-id');

    // Send a DELETE request to the server to delete the post
    fetch("/api/post/" + postId.value, {
        method: "delete" // Use the DELETE HTTP method
    })
    .then(function() {
        // Redirect to the dashboard page after successful deletion
        document.location.replace("/dashboard");
    })
    .catch(err => console.log(err)); // Handle and log any errors
}

// Add an event listener to the delete button to trigger the deletePostHandler
document.querySelector("#delete-btn").addEventListener("click", deletePostHandler);
