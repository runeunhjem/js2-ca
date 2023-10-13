// import { populateTags } from "./feed-get-posts";
import {
  loggedInUser,
  currentProfileName,
  profilePostsURL,
  fetchOptions,
  profileURL,
  followText,
  loggedInUserData,
  URLProfilename,
  API_BASE_URL,
  token,
} from "./variables/consts.mjs";
import { populateTagsSelector, filterUserTagsSelector } from "./feed-get-posts.js";

export async function getProfileData(profileURL, fetchOptions) {
  try {
    const followButton = document.getElementById("loggedInProfileFollow");
    const response = await fetch(profileURL, fetchOptions);
    const json = await response.json();

    console.log("profileData 1 is:", json);

    if (json.posts && Array.isArray(json.posts)) {
      console.log("profileData 1-posts is an array:", json.posts);

      const allPostsTags = [];

      json.posts.forEach((post) => {
        if (post && Array.isArray(post.tags)) {
          // console.log("Tags for post", post.id, "are:", post.tags);
          // Concatenate post tags with allPostsTags
          allPostsTags.push(...post.tags);
        } else {
          // console.log("Tags for post", post.id, "are undefined or not an array.");
        }
      });

      console.log("All valid tags:", allPostsTags);
      populateTagsSelector(allPostsTags, filterUserTagsSelector);
      // console.log("filterUserTagsSelector is:", filterUserTagsSelector);

    } else {
      console.log("json.posts is undefined or not an array.");
    }


    if (!json) {
      window.location.reload();
    } else {
      // console.log("loggedInUser is :", loggedInUser);
      const loggedInUserLowerCase = loggedInUser.toLowerCase();
      const followersLowercase = json.followers.map((follower) => follower.name.toLowerCase());
      const followedByLoggedInUser = followersLowercase.includes(loggedInUserLowerCase);

      // console.log("followedByLoggedInUser is ", followedByLoggedInUser);
      if (loggedInUser === URLProfilename) {
        followText.textContent = "Can't follow you...";
        followButton.disabled = true;
      } else if (followedByLoggedInUser) {
        followText.textContent = "Unfollow";
        followButton.disabled = false;
        // console.log("currentUserData.followers =", currentUserData.followers);
        // console.log("currentUserData.following =", currentUserData.following);
      } else {
        followText.textContent = "Follow";
        followButton.disabled = false;
      }
    }

    if (!loggedInUserData) {
      localStorage.setItem("loggedInUserData", JSON.stringify(json));
      localStorage.setItem("currentUserData", JSON.stringify(json));
      localStorage.setItem("loggedInUser", json.name);
      localStorage.setItem("currentProfileName", json.name);
    } else {
      localStorage.setItem("currentProfileName", json.name);
      localStorage.setItem("currentUserData", JSON.stringify(json));
    }

    if (response.status >= 200 && response.status <= 299) {
      console.log("Profile data fetched successfully!");
      return json;
    } else {
      console.log("Profile data fetching failed!");
    }
  } catch (error) {
    if (!error.message.includes("https://picsum.photos")) {
      console.error("Error:", error);
    }
    console.error(error);
  }
}

async function initProfilePage() {
  try {
    // Fetch the profile data and await the result
    const profilePosts = await getProfileData(profileURL, fetchOptions);

    // Update the profile page based on the fetched data
    await updateProfilePage(profilePosts);

    if (URLProfilename) {
      localStorage.setItem("currentProfileName", URLProfilename);
    }
  } catch (error) {
    console.error("Error initializing the profile page:", error);
  }
}

export async function getProfilePosts() {
  try {
    const response = await fetch(profilePostsURL, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    if (!error.message.includes("https://picsum.photos")) {
      console.error("Error:", error);
    }
    throw error;
  }
}

async function updateProfilePage(profileData) {
  await getProfilePosts();

  const profileNameElements = document.querySelectorAll(".loggedInProfileName");
  const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
  const profileFollowingElement = document.getElementById("loggedInProfileFollowing");
  const profilePostsElement = document.getElementById("loggedInProfilePosts");
  const profileFollowButton = document.getElementById("loggedInProfileFollow");
  const bannerImageElement = document.getElementById("bannerImage");
  const avatarImageElement = document.getElementById("avatarImage");

  if (profileData) {
    const authorName = URLProfilename || "Author Name Not Found";

    const title = currentProfileName ? `${authorName}'s profile` : `${currentProfileName}'s profile`;

    document.title = title;
    profileNameElements.forEach((element) => {
      element.textContent = authorName;
    });

    if (profileData._count) {
      profileFollowersElement.textContent = profileData._count.followers;
      profileFollowingElement.textContent = profileData._count.following;
      profilePostsElement.textContent = profileData._count.posts;
    }

    if (!profileData.banner) {
      bannerImageElement.style.backgroundImage = `url(../img/banner.jpg)`;
    } else {
      bannerImageElement.style.backgroundImage = `url(${profileData.banner})`;
    }

    if (!profileData.avatar) {
      // avatarImageElement.style.backgroundImage = `url("https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg")`;

    } else {
      avatarImageElement.style.backgroundImage = `url(${profileData.avatar})`;
    }
  }
}

getProfilePosts(profilePostsURL, fetchOptions)
  .then((currentProfilePosts) => {
    localStorage.setItem("currentProfilePosts", JSON.stringify(currentProfilePosts));
    if (!currentProfilePosts[0]) {
      const title = `${currentProfileName}'s profile`;
      document.title = title;
    } else {
      console.log("currentProfilePosts[0].author.name: ", currentProfilePosts[0].author.name);
      localStorage.setItem("URLProfileURL", currentProfilePosts[0].author.name);
    }

    updateProfilePage(currentProfilePosts);

    if (URLProfilename) {
      localStorage.setItem("currentProfileName", URLProfilename);
    }
  })
  .catch((error) => {
    console.error("Error initializing the profile page:", error);
  });

initProfilePage();

document.addEventListener("DOMContentLoaded", function () {
  const editProfileButton = document.getElementById("edit-profile");
  const profileEditForm = document.querySelector(".profile-edit-form");
  const avatarInput = document.getElementById("avatarInput");
  const bannerInput = document.getElementById("bannerInput");
  const changeButton = document.getElementById("changeButton");
  const closeButton = document.getElementById("closeButton");

  editProfileButton.addEventListener("click", function () {
    profileEditForm.classList.toggle("d-none");
    console.log(`Edit Profile Button clicked.`);
  });

  closeButton.addEventListener("click", function () {
    profileEditForm.classList.add("d-none");
  });

  changeButton.addEventListener("click", function () {
    const avatarURL = avatarInput.value;
    const bannerURL = bannerInput.value;

    const profileEditData = {
      avatar: avatarURL,
      banner: bannerURL,
    };
    // https://portfolio1-ca.netlify.app/images/rune-profile-pic-medium.png
    // Send a PUT request to update the profile
    fetch(`${API_BASE_URL}/social/profiles/${loggedInUser}/media`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileEditData),
    })
      .then((response) => {
        if (response.ok) {
          initProfilePage();
          // window.location.reload();
          console.log("Profile updated successfully!");
          // You can add more logic here, like updating the profile image and banner on the page
          profileEditForm.classList.add("d-none"); // Close the form
        } else {
          console.error("Failed to update the profile.");
        }
      })
      .catch((error) => {
        console.error("An error occurred during the profile update:", error);
      });
  });
});

