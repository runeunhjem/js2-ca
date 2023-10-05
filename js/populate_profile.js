import {
  loggedInUser,
  currentProfileName,
  currentUserData,
  profilePostsURL,
  fetchOptions,
  profileURL,
  followText,
  loggedInUserData,
  URLProfilename,
} from "./variables/consts.mjs";

async function getProfileData(profileURL, fetchOptions) {
  try {
    const response = await fetch(profileURL, fetchOptions);
    const json = await response.json();
    // console.log("profileData 1 is:", json);
    const followButton = document.getElementById("loggedInProfileFollow");

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

    if (profileData.banner || profileData.avatar) {
      bannerImageElement.style.backgroundImage = profileData.banner
        ? `url(${profileData.banner})`
        : 'url("../img/banner.jpg")';
      avatarImageElement.style.backgroundImage = profileData.avatar
        ? `url(${profileData.avatar})`
        : 'url("https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg")';

      // console.log(`1url(${profileData.avatar})`);
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
