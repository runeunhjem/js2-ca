import {
  loggedInUser,
  currentProfileName,
  currentUserData,
  profilePostsURL,
  fetchOptions,
  profileURL,
  followText,
  loggedInUserData,
  isFollowing,
} from "./variables/consts.mjs";
// import { handleSearch } from "./search.js";
const urlParams = new URLSearchParams(window.location.search);
const URLProfilename = urlParams.get("name");

async function getProfileData(profileURL, fetchOptions) {
  try {
    const response = await fetch(profileURL, fetchOptions);
    const json = await response.json();
    console.log("profileData is:", json);
    const followButton = document.getElementById("loggedInProfileFollow");
    // const followText = document.getElementById("button-text");

    if (!json) {
      window.location.reload();
    } else {
      if (loggedInUser === URLProfilename) {
        followText.textContent = "Can't follow you...";
        followButton.disabled = true;
      } else if (loggedInUserData && loggedInUserData.following && loggedInUserData.following.includes(URLProfilename)) {
        followText.textContent = "Unfollow";
        followButton.disabled = false;
        console.log("currentUserData.followers =", currentUserData.followers);
        console.log("currentUserData.following =", currentUserData.following);
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
      // window.location.reload();
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
// document.addEventListener("DOMContentLoaded", function () {
//     //
//   });

async function initProfilePage() {
  try {
    // Fetch the profile data and await the result
    const profilePosts = await getProfileData(profileURL, fetchOptions);

    // Update the profile page based on the fetched data
    await updateProfilePage(profilePosts);

    if (URLProfilename) {
      localStorage.setItem("currentProfileName", URLProfilename);
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
  await getProfilePosts();

  // Check if profileData exists
  const profileNameElements = document.querySelectorAll(".loggedInProfileName");
  const profileFollowersElement = document.getElementById("loggedInProfileFollowers");
  const profileFollowingElement = document.getElementById("loggedInProfileFollowing");
  const profilePostsElement = document.getElementById("loggedInProfilePosts");
  const profileFollowButton = document.getElementById("loggedInProfileFollow");
  const bannerImageElement = document.getElementById("bannerImage");
  const avatarImageElement = document.getElementById("avatarImage");
  if (profileData) {
    // console.log("profileData populate: ", profileData);

    // Access the 'name' property of the profileData object if it exists, otherwise display a default value
    const authorName = URLProfilename || "Author Name Not Found";

    const title = currentProfileName
      ? // ? `${currentProfilePosts[0].author.name}'s profile`
        // : currentProfileName
        `${authorName}'s profile`
      : `${currentProfileName}'s profile`;

    document.title = title; // Set the document title with the total number of results
    profileNameElements.forEach((element) => {
      element.textContent = authorName;
    });

    // Check if _count property exists in the profileData object
    if (profileData._count) {
      // Update count values with actual counts from the API
      profileFollowersElement.textContent = profileData._count.followers;
      profileFollowingElement.textContent = profileData._count.following;
      profilePostsElement.textContent = profileData._count.posts;
    }

    if (profileData.banner || profileData.avatar) {
      bannerImageElement.style.backgroundImage = profileData.banner
        ? `url(${profileData.banner})`
        : 'url("../img/banner.jpg")';
      avatarImageElement.style.backgroundImage = profileData.avatar
        ? `url(${profileData.avatar})`
        : 'url("https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg")';
    }
    // Don't need this else statement
    // else {
    //   // Handle the case where profileData is not found
    //   console.error("Profile data not found");
    //   if (currentUserData.banner) {
    //     bannerImageElement.style.backgroundImage = `url(${currentUserData.banner})`;
    //   } else {
    //     bannerImageElement.style.backgroundImage = 'url("../img/banner.jpg")';
    //   }
    //   if (currentUserData.avatar) {
    //     avatarImageElement.style.backgroundImage = `url(${currentUserData.avatar})`;
    //   } else {
    //     avatarImageElement.style.backgroundImage =
    //     'url("https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg")';
    //   }
    // }
  }
}

getProfilePosts(profilePostsURL, fetchOptions)
  .then((currentProfilePosts) => {
    localStorage.setItem("currentProfilePosts", JSON.stringify(currentProfilePosts));
    if (!currentProfilePosts[0]) {
      const title = `${currentProfileName}'s profile`;
        document.title = title; // Set the document title with the total number of results
      } else {
      console.log("currentProfilePosts[0].author.name: ", currentProfilePosts[0].author.name);
      localStorage.setItem("URLProfileURL", currentProfilePosts[0].author.name);
      // const title = currentProfileName
      //   ? `${currentProfilePosts[0].author.name}'s profile`
      //   : currentProfileName
      //   ? `${currentProfileName}'s profile`
      //   : `${URLProfilename}'s profile`;

      // document.title = title; // Set the document title with the total number of results
      }

    updateProfilePage(currentProfilePosts);

    if (URLProfilename) {
      localStorage.setItem("currentProfileName", URLProfilename);
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

// Maybe handle this
// const profileImageElement = document.querySelector(".profile-image");
// if (profileImageElement) {
//   // Check if loggedInUserData is defined and contains the 'avatar' property
//   if (loggedInUserData && loggedInUserData.avatar) {
//     // Set the "src" attribute to the avatar URL from loggedInUserData
//     profileImageElement.src = loggedInUserData.avatar;
//   } else if (currentUserData && currentUserData.avatar) {
//     // Set a default avatar URL if loggedInUserData or 'avatar' property is missing

//     profileImageElement.src = currentUserData.avatar;
//   } else {
//     profileImageElement.src = "https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg";
//   }
// }
