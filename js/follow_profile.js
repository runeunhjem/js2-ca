import {
  loggedInUserData,
  followURL,
  unfollowURL,
  profileFollowButton,
  followText,
  followOptions,
} from "./variables/consts.mjs";

let followName;

profileFollowButton.addEventListener("click", () => {
  if (followText.textContent === "Follow") {
    fetch(followURL, followOptions)
      .then((response) => response.json())
      .then((data) => {
        followText.textContent = "Unfollow";
        const followName = data.name;

        // Update the count
        const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
        profileFollowersElement.textContent = parseInt(profileFollowersElement.textContent) + 1;

        // Update localStorage for loggedInUserData.following
        if (!loggedInUserData.following) {
          loggedInUserData.following = [];
        }

        loggedInUserData.following.push(followName);
        localStorage.setItem("loggedInUserData", JSON.stringify(loggedInUserData));
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
        followText.textContent = "Follow";

        // Update the count again when unfollowing
        const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
        profileFollowersElement.textContent = parseInt(profileFollowersElement.textContent) - 1;

        // Update localStorage for loggedInUserData.following
        if (loggedInUserData.following) {
          loggedInUserData.following = loggedInUserData.following.filter((name) => name !== followName);
          localStorage.setItem("loggedInUserData", JSON.stringify(loggedInUserData));
        }
      })
      .catch((error) => {
        if (!error.message.includes("https://picsum.photos")) {
          console.error("Error:", error);
        }
      });
  }
});