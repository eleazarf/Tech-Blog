// Define a function to handle user logout
function logout() {
    // Send a POST request to the server to log the user out
    fetch("/api/user/logout", {
        method: "post", // Use the POST HTTP method for logout
        headers: { "Content-Type": "application/json" } // Set the request content type to JSON
    })
    .then(function() {
        // Redirect to the home page upon successful logout
        document.location.replace("/");
    })
    .catch(err => console.log(err)); // Handle and log any errors
}

// Add an event listener to the logout link to trigger the logout function
document.querySelector("#logout-link").addEventListener("click", logout);
