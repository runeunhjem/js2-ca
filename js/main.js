import { togglePostContent } from "./utils/show-more-post-text.mjs";
import { toTopButton } from "./utils/back-to-top-button.js";
import { clickHandler, profileLinks } from "./variables/consts.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    const accessDeniedMessage = document.createElement("h1");
    accessDeniedMessage.textContent = "Access Denied";
    accessDeniedMessage.classList.add("text-center", "text-danger");

    const additionalInfo = document.createElement("p");
    additionalInfo.textContent = "Please log in or sign up to access our site.";
    additionalInfo.classList.add("d-flex", "flex-column", "align-items-center");

    const loginLink = document.createElement("a"); // Use an anchor element for the link
    loginLink.textContent = "Go to login.";
    loginLink.href = "../index.html"; // Set the href attribute to specify the destination URL
    loginLink.classList.add("text-center", "mt-3", "btn", "btn-warning"); // Add button styling to the link
    additionalInfo.appendChild(loginLink);

    const mainContainer = document.querySelector("main");
    mainContainer.innerHTML = "";
    mainContainer.appendChild(accessDeniedMessage);
    mainContainer.appendChild(additionalInfo);
  }
});


toTopButton();

profileLinks.forEach((link) => {
  link.addEventListener("click", clickHandler);
});

const logoutLinks = document.querySelectorAll(".logout-link");

logoutLinks.forEach(function (logoutLink) {
  logoutLink.addEventListener("click", function (logout) {
    logout.preventDefault();
    localStorage.clear();

    window.location.href = "../index.html";
  });
});

const showMoreButtons = document.querySelectorAll(".show-more-button");
showMoreButtons.forEach((button) => {
  button.addEventListener("click", togglePostContent);
});


