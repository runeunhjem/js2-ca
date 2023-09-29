import { loggedInUser, currentProfileName, profilePostsURL, fetchOptions, profileURL } from "./variables/consts.mjs";
// import { handleSearch } from "./search.js";
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("name");

async function getProfileData(profileURL, fetchOptions) {
  try {
    const response = await fetch(profileURL, fetchOptions);
    const json = await response.json();
    // console.log("profileData is:", JSON.stringify(json, null, 2));
    console.log("profileData is:", await json);

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
  }
}

async function initProfilePage() {
  try {
    // Fetch the profile data and await the result
    const profilePosts = await getProfileData(profileURL, fetchOptions);

    // Update the profile page based on the fetched data
    await updateProfilePage(profilePosts);

    if (userName) {
      localStorage.setItem("currentProfileName", userName);
    }

    // console.log(`loggedInUser: `, loggedInUser);
    // console.log(`currentProfilePosts: `, currentProfilePosts);
    // console.log(`currentProfilePosts: `, currentProfilePosts);
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
    throw error; // Rethrow the error to handle it where you call getProfilePosts
  }
}

async function updateProfilePage(profileData) {
  // Check if profileData exists
  if (profileData) {
    // console.log("profileData populate: ", profileData);
    const profileNameElements = document.querySelectorAll(".loggedInProfileName");
    const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
    const profileFollowingElement = document.getElementById("loggedInProfileFollowing");
    const profilePostsElement = document.getElementById("loggedInProfilePosts");
    const profileFollowButton = document.getElementById("loggedInProfileFollow");
    const bannerImageElement = document.getElementById("bannerImage");
    const avatarImageElement = document.getElementById("avatarImage");

    // Access the 'name' property of the profileData object if it exists, otherwise display a default value
    const authorName = userName || "Author Name Not Found";

    profileNameElements.forEach((element) => {
      element.textContent = authorName;
    });

    setTimeout(() => {
      // Check if _count property exists in the profileData object
      if (profileData._count) {
        // Update count values with actual counts from the API
        profileFollowersElement.textContent = profileData._count.followers;
        profileFollowingElement.textContent = profileData._count.following;
        profilePostsElement.textContent = profileData._count.posts;
      }
    }, 1000);

    if (profileData.banner) {
      bannerImageElement.style.backgroundImage = `url(${profileData.banner})`;
    } else {
      bannerImageElement.style.backgroundImage = 'url("https://picsum.photos/id/857/1600/200")';
    }
    if (profileData.avatar) {
      avatarImageElement.style.backgroundImage = `url(${profileData.avatar})`;
    } else {
      avatarImageElement.style.backgroundImage = 'url("https://picsum.photos/200/200")';
    }
  } else {
    // Handle the case where profileData is not found
    console.error("Profile data not found");
  }
}

getProfilePosts(profilePostsURL, fetchOptions)
  .then((currentProfilePosts) => {
    localStorage.setItem("currentProfilePosts", JSON.stringify(currentProfilePosts));
    updateProfilePage(currentProfilePosts);

    if (userName) {
      localStorage.setItem("currentProfileName", userName);
    }

    // console.log(`loggedInUser: `, loggedInUser);
    // console.log(`currentProfilePosts: `, currentProfilePosts);
    // console.log(`currentProfilePosts: `, currentProfilePosts);
  })
  .catch((error) => {
    console.error("Error initializing the profile page:", error);
  });

// Call the initProfilePage function to initialize the profile page
initProfilePage();

const followButton = document.getElementById("loggedInProfileFollow");
if (loggedInUser === currentProfileName) {
  // If the logged-in user is the same as the current profile, disable the button
  followButton.textContent = "Can't follow you...";
  followButton.disabled = true;
} else {
  // If the logged-in user is different, you can leave the button as it is
  followButton.textContent = "Follow";
  followButton.disabled = false;
}
