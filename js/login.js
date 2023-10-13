import { API_BASE_URL } from "./variables/consts.mjs";
import { preFillFormFields, loginUser } from "./utils/login.mjs";

const loginForm = document.getElementById("login-form");
preFillFormFields();

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginForm.classList.add("was-validated");

    try {
      const formData = new FormData(loginForm);
      const formDataObject = Object.fromEntries(formData.entries());
      const loginURL = `${API_BASE_URL}/social/auth/login`;
      await loginUser(loginURL, formDataObject);
    } catch (error) {
      console.error(error);
    }
  });
