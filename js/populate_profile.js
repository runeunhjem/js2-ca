let loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData"));
console.log(`loggedInUserData: `, loggedInUserData);

// Get references to the elements you want to update
// const profileNameElement = document.querySelector(".loggedInProfileName");
const profileNameElements = document.querySelectorAll(".loggedInProfileName");
const profileFollowersElement = document.getElementById('loggedInProfileFollowers');
const profileFollowingElement = document.getElementById('loggedInProfileFollowing');
const profileFollowButton = document.getElementById('loggedInProfileFollow');
const bannerImageElement = document.getElementById("bannerImage");
const avatarImageElement = document.getElementById("avatarImage");

// Update the content with the data from loggedInUser
// profileNameElement.textContent = loggedInUserData.name;
profileNameElements.forEach((element) => {
  element.textContent = loggedInUserData.name;
});
profileFollowersElement.textContent = loggedInUserData._count.followers;
profileFollowingElement.textContent = loggedInUserData._count.following;

// You can also handle the "Follow" button behavior if needed
profileFollowButton.addEventListener('click', () => {
  // Add your logic for following or unfollowing the user here
});

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
