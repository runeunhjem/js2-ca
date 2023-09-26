import { togglePostContent } from "./utils/show-more-post-text.js";

const logoutLinks = document.querySelectorAll(".logout-link");

logoutLinks.forEach(function (logoutLink) {
  logoutLink.addEventListener("click", function (logout) {
    logout.preventDefault();

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUserData");
    localStorage.removeItem("currentProfileNameDetails");
    localStorage.removeItem("currentProfileName");
    localStorage.removeItem("reactionsAndComments");
    localStorage.removeItem("profilePostsData");

    window.location.href = "../index.html";
  });
});


// Add click event listener to the "Show More" button in each card
const showMoreButtons = document.querySelectorAll(".show-more-button");
showMoreButtons.forEach((button) => {
  button.addEventListener("click", togglePostContent);
});

