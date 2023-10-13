import { togglePostContent } from "./utils/show-more-post-text.mjs";
import { toTopButton } from "./utils/back-to-top-button.js";
import { clickHandler, profileLinks, allPostsTags } from "./variables/consts.mjs";
import { populateTagsSelector } from "./feed-get-posts.js";

// document.addEventListener("DOMContentLoaded", () => {
//   //
//   populateTagsSelector(allPostsTags, filterUserTagsSelector);
// });

// import { captureCurrentPagePosts } from "./utils/current-page-posts.mjs";

// document.addEventListener("DOMContentLoaded", captureCurrentPagePosts);
// document.addEventListener("DOMContentLoaded", waitForPosts);
// Add an event listener to capture posts whenever any change occurs within the document
// document.addEventListener("change", () => {
//   waitForPosts();
// });

toTopButton();

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
  // populateTagsSelector(allPostsTags, filterUserTagsSelector);
});

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

if (window.location.href.includes("/post") || window.location.href.includes("/profile/")) {
  const hideNextPreviousLinks = document.querySelector(".get-next");
  hideNextPreviousLinks.classList.add("d-none");
}

