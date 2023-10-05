import {
  API_BASE_URL,
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
        console.log("data is:", data);
        followText.textContent = "Unfollow";
        const followName = data.name;

        // Increment the followers count by 1 when following
        const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
        profileFollowersElement.textContent = parseInt(profileFollowersElement.textContent) + 1;

        // Update localStorage for loggedInUserData.following
        if (!loggedInUserData.following) {
          loggedInUserData.following = [];
        }

        loggedInUserData.following.push(followName); // Assuming "followName" contains the user ID of the followed user
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
        console.log(data);
        followText.textContent = "Follow";

        // Decrement the followers count by 1 when unfollowing
        const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
        profileFollowersElement.textContent = parseInt(profileFollowersElement.textContent) - 1;

        // Update localStorage for loggedInUserData.following
        if (loggedInUserData.following) {
          loggedInUserData.following = loggedInUserData.following.filter((name) => name !== followName); // Assuming "followName" contains the name of the unfollowed user
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


// profileFollowButton.addEventListener("click", () => {
//   if (followText.textContent === "Follow") {
//     fetch(followURL, followOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         followText.textContent = "Unfollow";

//         // Increment the followers count by 1 when following
//         const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
//         profileFollowersElement.textContent = parseInt(profileFollowersElement.textContent) + 1;
//       })
//       .catch((error) => {
//         if (!error.message.includes("https://picsum.photos")) {
//           console.error("Error:", error);
//         }
//       });
//   } else if (followText.textContent === "Unfollow") {
//     fetch(unfollowURL, followOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         followText.textContent = "Follow";

//         // Decrement the followers count by 1 when unfollowing
//         const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
//         profileFollowersElement.textContent = parseInt(profileFollowersElement.textContent) - 1;
//       })
//       .catch((error) => {
//         if (!error.message.includes("https://picsum.photos")) {
//           console.error("Error:", error);
//         }
//       });
//   }
// });
