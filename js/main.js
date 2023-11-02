import { togglePostContent } from "./utils/show-more-post-text.mjs";
import { toTopButton } from "./utils/back-to-top-button.js";
import { clickHandler, profileLinks } from "./variables/consts.mjs";
import { logout } from "./utils/logout.mjs";

/**
 * Add a "Back to Top" button to the page.
 */
toTopButton();

/**
 * Get the access token from localStorage and display an access denied message if it's not there.
 */
document.addEventListener("DOMContentLoaded", function () {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    const accessDeniedMessage = document.createElement("h1");
    accessDeniedMessage.textContent = "Access Denied";
    accessDeniedMessage.classList.add("text-center", "text-danger");

    const additionalInfo = document.createElement("p");
    additionalInfo.textContent = "Please log in or sign up to access our site.";
    additionalInfo.classList.add("d-flex", "flex-column", "align-items-center");

    const loginLink = document.createElement("a");
    loginLink.textContent = "Go to login.";
    loginLink.href = "../index.html";
    loginLink.classList.add("text-center", "mt-3", "btn", "btn-warning");
    additionalInfo.appendChild(loginLink);

    const mainContainer = document.querySelector("main");
    mainContainer.innerHTML = "";
    mainContainer.appendChild(accessDeniedMessage);
    mainContainer.appendChild(additionalInfo);
  }
});

/**
 * Attach click event handlers to profile links.
 */
profileLinks.forEach((link) => {
  link.addEventListener("click", clickHandler);
});

/**
 * Attach click event handlers to logout links.
 */
const logoutLinks = document.querySelectorAll(".logout-link");
logoutLinks.forEach(function (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    logout(e);
  });
});

/**
 * Toggle the visibility of post content when the "Show More" button is clicked.
 */
const showMoreButtons = document.querySelectorAll(".show-more-button");
showMoreButtons.forEach((button) => {
  button.addEventListener("click", togglePostContent);
});

/**
 * Change background color of the active link
 */
const mainContainer = document.querySelector(".accordion");
const navLinks = mainContainer.querySelectorAll(".nav-link");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    const isActive = navLink.classList.contains("bg-warning");
    navLinks.forEach((link) => {
      link.classList.remove("bg-warning");
    });
    if (!isActive || navLink.classList.contains("collapsed")) {
      navLink.classList.add("bg-warning");
    }
  });
});

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    navLinks.forEach((link) => {
      link.classList.remove("bg-warning");
      if (navLink === link || navLink.classList.contains("active")) {
        navLink.classList.remove("bg-warning");
      }
    });
    navLink.classList.add("bg-warning");
  });
});

/**
 * Hide the "Next" and "Previous" links on the post.html and profile/index.html pages
 */
if (window.location.href.includes("/post") || window.location.href.includes("/profile/")) {
  const hideNextPreviousLinks = document.querySelector(".get-next");
  hideNextPreviousLinks.classList.add("d-none");
}
