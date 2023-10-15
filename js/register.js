import { registerURL } from "./variables/consts.mjs";

/**
 * Register a user when the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("signup-form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    registerForm.classList.add("was-validated");
    try {
      const formData = new FormData(registerForm); // Create FormData object from the registerForm inputs

      // Create an empty object to hold user data
      const userData = {};

      // Iterate over form elements and add them to the userData object
      formData.forEach((value, key) => {
        userData[key] = value;
      });

      const response = await fetch(registerURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Convert userData object to JSON
      });

      const json = await response.json();
      if (response.status >= 200 && response.status <= 299) {
        localStorage.setItem("loggedInUser", json.name);
        const registerButton = document.getElementById("registerButton");
        registerButton.classList.remove("btn-warning");
        registerButton.textContent = "Registration successful!";
        registerButton.classList.add("btn-success", "text-light", "fw-bold");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("Registration failed!");
        alert("Registration failed! Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  });
});