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
  // Check if loggedInUserData is defined and contains the 'avatar' property
  if (loggedInUserData && loggedInUserData.avatar) {
    // Set the "src" attribute to the avatar URL from loggedInUserData
    profileImageElement.src = loggedInUserData.avatar;
  } else {
    // Set a default avatar URL if loggedInUserData or 'avatar' property is missing
    setTimeout(() => {
      if (loggedInUserData && loggedInUserData.avatar) {
        // Set the "src" attribute to the avatar URL from loggedInUserData
        profileImageElement.src = loggedInUserData.avatar;
      } else {
        profileImageElement.src = "https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg";
      }
    }, 1000);
  }
}
