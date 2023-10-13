export function validateLoginForm() {

  const registerForm = document.getElementById("signup-form");
  const registerButton = document.getElementById("register-button");
  const userName = document.getElementById("registerName");
  const registerNameError = document.getElementById("name-input-error");
  const registerEmail = document.getElementById("registerEmail");
  const registerEmailError = document.getElementById("register-email-input-error");
  const registerPassword = document.getElementById("password");
  const registerPasswordError = document.getElementById("register-password-error");
  const confirmSuccess = document.getElementById("register-success");
  const nameAfter = document.getElementById("name-after");
  const emailAfter = document.getElementById("email-after");
  const passwordAfter = document.getElementById("password-after");

  userName.addEventListener("focus", function () {
    userName.placeholder = "Min 2 characters";
  });
  userName.addEventListener("blur", function () {
    userName.placeholder = "Name or Nickname";
  });
  registerEmail.addEventListener("focus", function () {
    registerEmail.placeholder = "name@noroff.no/name@stud.noroff.no";
  });
  registerEmail.addEventListener("blur", function () {
    registerEmail.placeholder = "Valid Email";
  });
  registerPassword.addEventListener("focus", function () {
    registerPassword.placeholder = "Min 8 characters";
  });
  registerPassword.addEventListener("blur", function () {
    registerPassword.placeholder = "Min 8 characters";
  });

  function validateForm(event) {
    if (checkLength(userName.value, 1)) {
      userName.classList.add("was-validated");
      userName.classList.add("needs-validation");
      userName.classList.add("input-validated");
      nameAfter.classList.add("show-checkmark");
      nameAfter.classList.add("validated");
    } else {
      nameAfter.innerText = registerNameError.innerText;
      userName.classList.remove("was-validated");
      userName.classList.remove("needs-validation");
      userName.classList.remove("input-validated");
      nameAfter.classList.remove("show-checkmark");
      nameAfter.classList.remove("validated");
    }
    if (validateEmail(registerEmail.value)) {
      registerEmail.classList.add("was-validated");
      registerEmail.classList.add("needs-validation");
      registerEmail.classList.add("input-validated");
      emailAfter.classList.add("show-checkmark");
      emailAfter.classList.add("validated");
    } else {
      emailAfter.innerText = registerEmailError.innerText;
      registerEmail.classList.remove("was-validated");
      registerEmail.classList.remove("needs-validation");
      registerEmail.classList.remove("input-validated");
      emailAfter.classList.remove("show-checkmark");
      emailAfter.classList.remove("validated");
    }
    if (checkLength(registerPassword.value, 2)) {
      registerPassword.classList.add("was-validated");
      registerPassword.classList.add("needs-validation");
      registerPassword.classList.add("input-validated");
      passwordAfter.classList.add("show-checkmark");
      passwordAfter.classList.add("validated");
    } else {
      passwordAfter.innerText = registerPasswordError.innerText;
      registerPassword.classList.remove("was-validated");
      registerPassword.classList.remove("needs-validation");
      registerPassword.classList.remove("input-validated");
      passwordAfter.classList.remove("show-checkmark");
      passwordAfter.classList.remove("validated");
    }

    if (
      validateUserName(userName.value) &&
      validateEmail(registerEmail.value) &&
      checkLength(registerPassword.value, 7)
    ) {
      registerButton.setAttribute("type", "submit");
      registerButton.style.cursor = "pointer";
      registerButton.innerText = "Send Message";
      registerButton.addEventListener("click", successMessage);
    } else {
      registerButton.innerText = "Send Message";
      registerButton.setAttribute("type", "button");
      confirmSuccess.style.display = "none";
    }
  }
  registerForm.addEventListener("submit", function (event) {
    validateForm(event);
  });

  userName.addEventListener("input", validateForm);
  registerEmail.addEventListener("input", validateForm);
  registerPassword.addEventListener("input", validateForm);
  registerButton.addEventListener("click", validateForm);

  function checkLength(value, len) {
    if (value.trim().length > len) {
      return true;
    } else {
      return false;
    }
  }

  // Use a regular expression to check for valid characters in the username and email
  function validateUserName(username) {
    const regEx = /^[a-zA-Z0-9_]+$/;
    const patternMatches = regEx.test(username);
    return patternMatches;
  }

  function validateEmail(email) {
    const noroffPattern = /@noroff\.no$/;
    const studNoroffPattern = /@stud\.noroff\.no$/;
    return noroffPattern.test(email) || studNoroffPattern.test(email);
  }
}