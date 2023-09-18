import { loggedInUser } from "./variables/consts.js";
import { loggedInUserData } from "./variables/consts.js";
// let loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData"));
// let loggedInUser = localStorage.getItem("loggedInUser");
console.log(`loggedInUserData: `, loggedInUserData);
console.log(`loggedInUser: `, loggedInUser);

const profileNameElements = document.querySelectorAll(".loggedInProfileName");
const profileFollowersElement = document.getElementById('loggedInProfileFollowers');
const profileFollowingElement = document.getElementById('loggedInProfileFollowing');
const profilePostsElement = document.getElementById('loggedInProfilePosts');
const profileFollowButton = document.getElementById('loggedInProfileFollow');
const bannerImageElement = document.getElementById("bannerImage");
const avatarImageElement = document.getElementById("avatarImage");

profileNameElements.forEach((element) => {
  element.textContent = loggedInUserData.name;
});
profileFollowersElement.textContent = loggedInUserData._count.followers;
profileFollowingElement.textContent = loggedInUserData._count.following;
profilePostsElement.textContent = loggedInUserData._count.posts;

if (loggedInUserData.banner) {
  // If a banner exists, set the background image to the banner URL
  bannerImageElement.style.backgroundImage = `url(${loggedInUserData.banner})`;
} else {
  // If no banner exists, set the background image to the Lorem Picsum URL
  bannerImageElement.style.backgroundImage = 'url("https://picsum.photos/id/857/1600/200")';
}
if (loggedInUserData.avatar) {
  // If an avatar exists, set the image source to the avatar URL
  avatarImageElement.style.backgroundImage = `url(${loggedInUserData.avatar})`;
} else {
  // If no avatar exists, set the image source to the default URL (e.g., placeholder image)
  avatarImageElement.style.backgroundImage = 'url("https://picsum.photos/200/200")';
}

// const followingCount = loggedInUserData._count.following;
// const followersCount = loggedInUserData._count.followers;
// const postsCount = loggedInUserData._count.posts;

// If the logged in user is following the profile, change the button text to "Unfollow"
// if (loggedInUserData._count.following) {
//   profileFollowButton.textContent = "Unfollow"; // Change button text to "Unfollow"
//   profileFollowButton.classList.add("unfollow"); // Add the "unfollow" class to the button
// }


