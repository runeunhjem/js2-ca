import { togglePostContent } from "./utils/show-more-post-text.mjs";
import { toTopButton } from "./utils/back-to-top-button.js";
import { clickHandler, profileLinks, loggedInUserData } from "./variables/consts.mjs";

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

// Add click event listener to the "Show More" button in each card
const showMoreButtons = document.querySelectorAll(".show-more-button");
showMoreButtons.forEach((button) => {
  button.addEventListener("click", togglePostContent);
});



// Select the element with the "profile-image" class
const profileImageElement = document.querySelector(".profile-image"); // Adjust the selector as needed
if (profileImageElement) {
  // Set the "src" attribute to the avatar URL from loggedInUserData
  profileImageElement.src = loggedInUserData.avatar;
} else {
  console.error("Element with class 'profile-image' not found on the page.");
}