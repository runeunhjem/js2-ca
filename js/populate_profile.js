import { loggedInUser, profilePostsURL, fetchOptions, profileURL } from "./variables/consts.mjs";
// import { handleSearch } from "./search.js";
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("name");

async function getProfileData(profileURL, fetchOptions) {
  try {
    const response = await fetch(profileURL, fetchOptions);
    const json = await response.json();
    // console.log("profileData is:", JSON.stringify(json, null, 2));

    if (response.status >= 200 && response.status <= 299) {
      console.log("Profile data fetched successfully!");
      return json;
    } else {
      console.log("Profile data fetching failed!");
    }
  } catch (error) {
    console.error(error);
  }
}

async function initProfilePage() {
  try {
    // Fetch the profile data and await the result
    const profileData = await getProfileData(profileURL, fetchOptions);

    // Update the profile page based on the fetched data
    updateProfilePage(profileData);

    if (userName) {
      localStorage.setItem("currentProfileName", userName);
    }

    console.log(`loggedInUser: `, loggedInUser);
    // console.log(`loggedInUserData: `, loggedInUserData);
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
    console.error(error);
    throw error; // Rethrow the error to handle it where you call getProfilePosts
  }
}

async function updateProfilePage(profileData) {
  // Check if profileData exists
  if (profileData) {
    console.log(profileData);
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

    // Check if _count property exists in the profileData object
    if (profileData._count) {
      profileFollowersElement.textContent = profileData._count.followers || 0;
      profileFollowingElement.textContent = profileData._count.following || 0;
      profilePostsElement.textContent = profileData._count.posts || 0;
    } else {
      // Handle the case where _count doesn't exist in profileData
      profileFollowersElement.textContent = 0;
      profileFollowingElement.textContent = 0;
      profilePostsElement.textContent = 0;
    }

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
  .then((loggedInUserData) => {
    localStorage.setItem("loggedInUserData", JSON.stringify(loggedInUserData));
    updateProfilePage(loggedInUserData);

    if (userName) {
      localStorage.setItem("currentProfileName", userName);
    }

    console.log(`loggedInUser: `, loggedInUser);
    console.log(`loggedInUserData: `, loggedInUserData);
    // console.log(`currentProfilePosts: `, currentProfilePosts);
  })
  .catch((error) => {
    console.error("Error initializing the profile page:", error);
  });

// Call the initProfilePage function to initialize the profile page
initProfilePage();

