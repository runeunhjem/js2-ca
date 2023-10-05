import { createPostCard } from "./utils/feed.mjs";
import { createPostURL, fetchOptions } from "./variables/consts.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postIdToDisplay = urlParams.get("postId");

export async function getSinglePost(url, options, id) {
  try {
    const fetchURL = `${url}/${id}?_comments=true&_author=true&_reactions=true`;
    console.log("fetchURL is:", fetchURL);
    const response = await fetch(fetchURL, options);

    if (response.ok) {
      const post = await response.json();

      if (post) {
        const singlePostContainer = document.getElementById("view-post");
        const singlePostCard = createPostCard(post);
        singlePostContainer.innerHTML = "";
        singlePostContainer.appendChild(singlePostCard);

        const feedPosts = document.getElementById("feed-posts");
        if (feedPosts) {
          feedPosts.innerHTML = "";
        }
      } else {
        console.error("Post with ID not found.");
      }
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    if (!error.message.includes("https://picsum.photos")) {
      console.error("Error:", error);
    }
  }
}

getSinglePost(createPostURL, fetchOptions, postIdToDisplay);
