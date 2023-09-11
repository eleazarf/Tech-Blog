// Define an asynchronous function to handle post editing
const editFormHandler = async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve elements and post ID from the HTML
    const titleEl = document.getElementById('post-title');
    const bodyEl = document.getElementById('post-body');
    const postId = document.getElementById('post-id');

    // Send a PUT request to the server to update the post
    fetch("/api/post/" + postId.value, {
        method: "put", // Use the PUT HTTP method for updating
        body: JSON.stringify({
            title: titleEl.value, // Get the updated title
            body: bodyEl.value   // Get the updated body
        }),
        headers: { "Content-Type": "application/json" } // Set the request content type to JSON
    })
    .then(function() {
        // Redirect to the dashboard page after successful post update
        document.location.replace("/dashboard");
    })
    .catch(err => console.log(err)); // Handle and log any errors
}

// Add an event listener to the edit post form to trigger the editFormHandler
document.querySelector("#edit-post-form").addEventListener("submit", editFormHandler);
