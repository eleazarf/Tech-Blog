// Define an asynchronous function to handle user signup
const signupFormHandler = async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the username and password elements from the HTML
    const usernameEl = document.querySelector("#username-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");

    // Send a POST request to the server for user signup
    fetch("/api/user", {
        method: "post", // Use the POST HTTP method for signup
        body: JSON.stringify({
            username: usernameEl.value, // Get the entered username
            password: passwordEl.value  // Get the entered password
        }),
        headers: { "Content-Type": "application/json" } // Set the request content type to JSON
    })
    .then(function() {
        // Redirect to the dashboard page upon successful signup
        document.location.replace("/dashboard");
    })
    .catch(err => console.log(err)); // Handle and log any errors
};

// Add an event listener to the signup form to trigger the signupFormHandler
document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);
