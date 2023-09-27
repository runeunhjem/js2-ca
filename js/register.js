import { API_BASE_URL } from "./variables/consts.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("signup-form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(registerForm);

      // Create an empty object to hold user data
      const userData = {};

      // Iterate over form elements and add them to the userData object
      formData.forEach((value, key) => {
        userData[key] = value;
      });

      console.log("userData:", userData);

      const registerURL = `${API_BASE_URL}/social/auth/register`;

      const response = await fetch(registerURL, {
        method: "POST",
        body: JSON.stringify(userData), // Convert userData object to JSON
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (response.status >= 200 && response.status <= 299) {
        localStorage.setItem("loggedInUser", userData.name);
        console.log("Registration successful!");
        window.location.href = "/profile/";
      } else {
        console.log("Registration failed!");
      }
    } catch (error) {
      console.error(error);
    }
  });
});

// import { API_BASE_URL } from "./variables/consts.mjs";

// document.addEventListener("DOMContentLoaded", function () {
//   const registerForm = document.getElementById("signup-form");

//   registerForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     try {
//       const name = document.getElementById("registerName").value;
//       const email = document.getElementById("registerEmail").value;
//       const password = document.getElementById("password").value;
//       const avatar = document.getElementById("avatar").value;
//       const banner = document.getElementById("banner").value;

//       const userData = {
//         name,
//         email,
//         password,
//         avatar,
//         banner,
//       };

//       console.log("userData:", userData);

//       const registerURL = `${API_BASE_URL}/social/auth/register`;

//       const response = await fetch(registerURL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       const json = await response.json();
//       if (response.status >= 200 && response.status <= 299) {
//         localStorage.setItem("loggedInUser", userData.name);
//         console.log("Registration successful!");
//         window.location.href = "/profile/";
//       } else {
//         console.log("Registration failed!");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   });
// });
