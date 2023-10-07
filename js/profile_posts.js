import { urlParams } from "./variables/consts.mjs";
import { getProfilePosts } from "./populate_profile.js";
import { createPostCard } from "./utils/feed.mjs";

// import { loggedInUserPosts } from "./variables/consts.mjs";
const currentUserName = urlParams.get("name");

document.addEventListener("DOMContentLoaded", async function () {
  // Display a loading indicator while data is being fetched
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.textContent = "Loading...";

  try {
    // Await the data loading functions
    const profilePostsData = await getProfilePosts();
    loadingIndicator.textContent = "";
    // console.log(profilePostsData.length);
    // Check if data is available and has posts
    if (profilePostsData && Array.isArray(profilePostsData) && profilePostsData.length > 0) {
      const profilePosts = document.getElementById("feed-posts");
      // const profilePosts = document.getElementById("profilePosts");

      profilePostsData.forEach((post) => {
        const card = createPostCard(post);
        profilePosts.appendChild(card);
      });

    } else {
      const card = this.getElementById("feed-posts");
      card.classList.add("card", "post-card", "m-0", "p-3", "fw-bold", "text-muted", "my-1", "bg-info", "shadow-sm");
      const spinner = document.querySelector(".spinner-border");
      spinner.classList.add("d-none");
      card.innerHTML = "<p>No posts found.</p>";
    }
  } catch (error) {
    console.error("Error initializing the profile page:", error);
  }
});
