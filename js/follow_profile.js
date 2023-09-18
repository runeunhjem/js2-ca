const API_BASE_URL = "https://api.noroff.dev";

let loggedInUser = localStorage.getItem("loggedInUser");
console.log(`loggedInUser: ${loggedInUser}`);
// const followURL = `${API_BASE_URL}/api/v1/social/profiles/fridlo/follow`;
// const unfollowURL = `${API_BASE_URL}/api/v1/social/profiles/fridlo/unfollow`;
const followURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}/follow`;
const unfollowURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}/unfollow`;
const profileFollowButton = document.getElementById("loggedInProfileFollow");

const token = localStorage.getItem("accessToken");
const followOptions = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

profileFollowButton.addEventListener("click", () => {

  if (profileFollowButton.innerHTML === "Follow") {
    fetch(followURL, followOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        profileFollowButton.innerHTML = "Unfollow";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else if (profileFollowButton.innerHTML === "Unfollow") {
    fetch(unfollowURL, followOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        profileFollowButton.innerHTML = "Follow";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

});