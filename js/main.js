import { togglePostContent } from "./utils/show-more-post-text.mjs";
import { toTopButton } from "./utils/back-to-top-button.js";
import { clickHandler, profileLinks } from "./variables/consts.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    const accessDeniedMessage = document.createElement("h1");
    accessDeniedMessage.textContent = "Access Denied";

    const additionalInfo = document.createElement("p");
    additionalInfo.textContent = "Please log in or sign up to access our site.";

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


