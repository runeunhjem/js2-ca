import { createPostCard } from "./utils/feed.mjs";
import { createPostURL, fetchOptions } from "./variables/consts.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postIdToDisplay = urlParams.get("postId");

// console.log("postIdToDisplay is a", typeof postIdToDisplay); // Should be a string

export async function getSinglePost(url, options, id) {
  try {
    // Construct the URL with the id and query parameters
    const fetchURL = `${url}/${id}?_comments=true&_author=true&_reactions=true`;

    const response = await fetch(fetchURL, options);

    if (response.ok) {
      const post = await response.json();
      console.log("Post: ", post);

      if (post) {
        const feedPosts = document.getElementById("feed-posts");
        const postCard = createPostCard(post);
        // console.log("postCard: ", postCard);
        feedPosts.innerHTML = ""; // Clear the existing content
        feedPosts.appendChild(postCard);
      } else {
        console.error("Post with ID not found.");
      }
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
  }
}

getSinglePost(createPostURL, fetchOptions, postIdToDisplay);