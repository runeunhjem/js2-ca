import {
  API_BASE_URL,
  loggedInUser,
  followURL,
  unfollowURL,
  profileFollowButton,
  followText,
  followOptions,
} from "./variables/consts.mjs";

profileFollowButton.addEventListener("click", () => {
  if (followText.textContent === "Follow") {
    fetch(followURL, followOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        followText.textContent = "Unfollow";

        // Increment the followers count by 1 when following
        const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
        profileFollowersElement.textContent = parseInt(profileFollowersElement.textContent) + 1;
      })
      .catch((error) => {
        if (!error.message.includes("https://picsum.photos")) {
          console.error("Error:", error);
        }
      });
  } else if (followText.textContent === "Unfollow") {
    fetch(unfollowURL, followOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        followText.textContent = "Follow";

        // Decrement the followers count by 1 when unfollowing
        const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
        profileFollowersElement.textContent = parseInt(profileFollowersElement.textContent) - 1;
      })
      .catch((error) => {
        if (!error.message.includes("https://picsum.photos")) {
          console.error("Error:", error);
        }
      });
  }
});
