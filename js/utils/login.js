// import { loggedInUser } from "../index.js";
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
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    let loggedInUser = json.name;
    localStorage.setItem("loggedInUser", loggedInUser);
    console.log(`Name: ${localStorage.getItem("loggedInUser")}`);
    return json;
  } catch (error) {
    console.error(error);
  }
}