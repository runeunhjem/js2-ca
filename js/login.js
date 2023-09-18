import { API_BASE_URL } from "./variables/consts.js";
import { preFillFormFields } from "./utils/login.js";
import { loginUser } from "./utils/login.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  preFillFormFields();

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(loginForm);
      const formDataObject = Object.fromEntries(formData.entries());

      console.log(`formDataObject: ${formDataObject}`);
      console.log(`loginForm: ${loginForm}`);

      const loginURL = `${API_BASE_URL}/api/v1/social/auth/login`;
      await loginUser(loginURL, formDataObject);

    } catch (error) {
      console.error(error);
    }
  });
});
