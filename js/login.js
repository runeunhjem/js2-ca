const API_BASE_URL = "https://api.noroff.dev";

function preFillFormFields() {
  const savedEmail = localStorage.getItem("savedEmail");
  const rememberMe = localStorage.getItem("rememberMe");

  if (savedEmail) {
    document.getElementById("loginEmail").value = savedEmail;
  }

  if (rememberMe === "true") {
    document.getElementById("remember").checked = true;
  }
}

async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    if (response.status === 200) {
      console.log("Login successful!");
      if (document.getElementById("remember").checked) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedEmail", userData.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedEmail");
      }

      window.location.href = "/profile/index.html";
    } else {
      console.log("Login failed!");
    }

    return json;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  preFillFormFields();

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const loginEmail = document.getElementById("loginEmail").value;
      const loginPassword = document.getElementById("loginPassword").value;

      userToLogin = {
        email: loginEmail,
        password: loginPassword,
      };

      const loginURL = `${API_BASE_URL}/api/v1/social/auth/login`;
      await loginUser(loginURL, userToLogin);
    } catch (error) {
      console.error(error);
    }
  });
});
