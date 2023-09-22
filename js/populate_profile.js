// populate_profile.js

import { loggedInUser, loggedInUserData, viewedProfileName } from "./variables/consts.js";
import { fetchAuthorProfile, updateProfileDetails } from "./utils/get_post_author_details.js";


// Import necessary modules and constants here

document.addEventListener("DOMContentLoaded", async function () {
  // Get the viewed profile name from localStorage
  // const viewedProfileName = localStorage.getItem("viewedProfileName");

  // Get the logged-in user from localStorage
  // const loggedInUser = localStorage.getItem("loggedInUser");

  if (viewedProfileName !== loggedInUser) {
    // Fetch author data using the viewedProfileName
    const authorData = await fetchAuthorProfile(viewedProfileName);

    if (authorData) {
      // Display the viewed profile based on authorData
      updateProfileDetails(authorData);
    } else {
      // Handle the case where authorData is null (error occurred during fetch)
      console.error("Error fetching author's profile data.");
    }
  } else {
    // Display the logged-in user's profile here
    updateProfileDetails(loggedInUserData);
  }
});


