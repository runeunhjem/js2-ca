export function preFillFormFields() {
  const savedEmail = localStorage.getItem("savedEmail");
  const rememberMe = localStorage.getItem("rememberMe");

  if (savedEmail) {
    document.getElementById("loginEmail").value = savedEmail;
  }

  if (rememberMe === "true") {
    document.getElementById("remember").checked = true;
  }
}

export async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();

    if (response.status >= 200 && response.status <= 299) {
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("loggedInUser", json.name);
      localStorage.setItem("currentProfileName", json.name);
      localStorage.setItem("authorName", json.name);
      localStorage.setItem("URLProfilename", json.name);
      localStorage.setItem("isFollowing", false);
      localStorage.setItem("isLoggedIn", true);

      const URLProfilename = json.name;
      const currentProfileURL = `../profile/index.html?name=${encodeURIComponent(URLProfilename)}`;

      if (document.getElementById("remember").checked) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedEmail", userData.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedEmail");
      }
      const loginButton = document.getElementById("login-button");
      loginButton.classList.remove("btn-warning");
      loginButton.textContent = "Success";
      loginButton.classList.add("btn-success", "text-light", "fw-bold");
      setTimeout(() => {
        window.location.href = currentProfileURL;
      }, 300);
    } else {
      console.log("Login failed!");
    }
    return json;
  } catch (error) {
    console.error(error);
  }
}
