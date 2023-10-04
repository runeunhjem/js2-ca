import { API_BASE_URL } from "./variables/consts.mjs";
import { preFillFormFields } from "./utils/login.mjs";
import { loginUser } from "./utils/login.mjs";

// document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  // const inputs = document.querySelectorAll("input");
  // const patterns = {
  //   loginEmail: /^[a-zA-Z0-9._%+-]+@(noroff.no|stud.noroff.no)$/,
  //   registerName: /[a - zA - Z0 -9_] +/,
  //   registerEmail: /^[a-zA-Z0-9._%+-]+@(noroff.no|stud.noroff.no)$/,
  //   loginPassword: /^.{8,}$/,
  //   password: /^.{8,}$/,
  // };

  preFillFormFields();

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // inputs.forEach((input) => {
    //   input.addEventListener("keyup", (e) => {
    //     validate(e.target, patterns[e.target.attributes.id.value]);
    //   });
    // });

    // function validate(field, regex) {
    //   if (regex.test(field.value)) {
    //     console.log("correct regex:", regex.test(field.value));
    //     field.className = "form-control valid";
    //   } else {
    //     console.log("fail regex:", regex.test(field.value));
    //     field.className = "form-control invalid";
    //   }
    // }

    loginForm.classList.add("was-validated");

    try {
      const formData = new FormData(loginForm);
      const formDataObject = Object.fromEntries(formData.entries());

      console.log(`formDataObject: ${formDataObject}`);
      console.log(`loginForm: ${loginForm}`);

      const loginURL = `${API_BASE_URL}/social/auth/login`;
      await loginUser(loginURL, formDataObject);
    } catch (error) {
      console.error(error);
    }
  });
// });


