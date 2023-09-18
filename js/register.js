import { API_BASE_URL } from "./variables/consts.js";
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("signup-form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const avatar = document.getElementById("avatar").value;
      const banner = document.getElementById("banner").value;

      const userData = {
        name,
        email,
        password,
        avatar,
        banner,
      };

      console.log("userData:", userData);

      const registerURL = `${API_BASE_URL}/api/v1/social/auth/register`;

      const response = await fetch(registerURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json();
      if (response.status >= 200 && response.status <= 299) {
        localStorage.setItem("loggedInUser", userData.name);
        console.log("Registration successful!");
        window.location.href = "/profile/index.html";
      } else {
        console.log("Registration failed!");
      }
    } catch (error) {
      console.error(error);
    }
  });
});
