// get_post_author_details.js

import { postsURL, fetchOptions, viewedProfileName } from "../variables/consts.js";

// Define the function to fetch author's profile data
export async function fetchAuthorProfile(authorName) {
  try {
    // Use the same URL for both viewing profiles and fetching author data
    const apiUrl = `${postsURL}?name=${encodeURIComponent(authorName)}`;

    // Make an API request to get the author's profile based on the apiUrl
    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // If a profile is being viewed, there's no need to fetch additional author data
    if (viewedProfileName) {
      return data;
    }

    // Add any additional logic for fetching extra data here if needed

    return data;
  } catch (error) {
    console.error("Error fetching author's profile:", error);
    return null;
  }
}


// Function to extract the profile elements' data from the response
export function updateProfileDetails(responseData) {
  const profileElements = {
    profileNameElements: document.querySelectorAll(".loggedInProfileName"),
    profileFollowersElement: document.getElementById("loggedInProfileFollowers"),
    profileFollowingElement: document.getElementById("loggedInProfileFollowing"),
    profilePostsElement: document.getElementById("loggedInProfilePosts"),
    profileFollowButton: document.getElementById("loggedInProfileFollow"),
    bannerImageElement: document.getElementById("bannerImage"),
    avatarImageElement: document.getElementById("avatarImage"),
  };

  const profileData = {
    profileNameElements: Array.from(profileElements.profileNameElements).map((element) => element.textContent),
    profileFollowersElement: profileElements.profileFollowersElement.textContent,
    profileFollowingElement: profileElements.profileFollowingElement.textContent,
    profilePostsElement: profileElements.profilePostsElement.textContent,
  };

  return profileData;
}
