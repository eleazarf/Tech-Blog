// Define an asynchronous function to handle creating a new post
const newFormHandler = async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the title and body from form inputs
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    // Get the user's token from local storage
    const token = localStorage.getItem("token");

    // Send a POST request to create a new post
    await fetch(`/api/post`, {
        method: "POST", // Use the POST HTTP method for creating a new post
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            "Content-Type": "application/json", // Set the request content type to JSON
            authorization: `Bearer ${token}` // Include the user's token in the headers
        }
    });

    // Redirect to the dashboard page upon successful post creation
    document.location.replace("/dashboard");
};

// Add an event listener to the new post form to trigger the newFormHandler
document
    .querySelector("#new-post-form")
    .addEventListener("submit", newFormHandler);
