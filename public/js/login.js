// Define an asynchronous function to handle user login
const loginFormHandler = async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the username and password elements from the HTML
    const usernameEl = document.querySelector("#username-input-login");
    const passwordEl = document.querySelector("#password-input-login");

    // Send a POST request to the server for user login
    fetch("/api/user/login", {
        method: "post", // Use the POST HTTP method for login
        body: JSON.stringify({
            username: usernameEl.value, // Get the entered username
            password: passwordEl.value  // Get the entered password
        }),
        headers: { "Content-Type": "application/json" } // Set the request content type to JSON
    })
    .then(function() {
        // Redirect to the dashboard page upon successful login
        document.location.replace("/dashboard");
    })
    .catch(err => console.log(err)); // Handle and log any errors
};

// Add an event listener to the login form to trigger the loginFormHandler
document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);
